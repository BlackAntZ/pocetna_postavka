import {mapiranjePodatakaSaBekenda, posaljiPodatke, povuciPodatke} from "./pomocne_funkcije.js";
import dayjs from "dayjs";
import {formatDatum, vrijemeFormatZaBazu} from "../components/Sredstva/podesavanja.jsx";

export const povuciSredstva = (metoda, setOSnovnaSredstva, organizacioneJedinice, konti, jediniceMjere, poreskeGrupe, setLoading) => {
  if (setLoading) setLoading(true);
  povuciPodatke(`dohvati_sva_osnovna_sredstva${metoda}`).then(rez => {
    const novaSredstva = mapirajSredstva(mapiranjePodatakaSaBekenda(rez['osnovna_sredstva']), organizacioneJedinice, konti, jediniceMjere, poreskeGrupe);
    setOSnovnaSredstva(novaSredstva);
    if (setLoading) setLoading(false);
  });
}

const mapirajSredstva = (sredstva, jedinice, konti, jm, poreskeGrupe) => {
  return sredstva.map(sredstvo => {
    const trenutnaJedinica = jedinice.find(jedinica => jedinica.id === sredstvo.organizaciona_jedinica_id);
    const trenutniKonto = konti.find(konto => konto.id === sredstvo.konto_id);
    const trenutnaJM = jm.find(jm => jm.id === sredstvo.jedinica_mjere_id);
    const trenutnaPG = poreskeGrupe.find(pog => pog.id === sredstvo.poreska_amortizaciona_grupa);

    return {
      ...sredstvo,
      organizaciona_jedinica_naziv: trenutnaJedinica ? trenutnaJedinica.naziv : '',
      organizaciona_jedinica_sifra: trenutnaJedinica ? trenutnaJedinica.sifra : '',
      konto_naziv: trenutniKonto ? trenutniKonto.konto_ime : '',
      jedinica_mjere_naziv: trenutnaJM ? trenutnaJM.naziv : '',
      poreska_amortizaciona_stopa: trenutnaPG ? trenutnaPG.stopa.toFixed(2) : 0.00
    };
  });
}

export const mapirajPromet = (promet, istorija, stopa) => {
  const istorijaAmortizacije = istorija.filter(isto => isto.amortizaciona_stopa !== null);

  return promet.map(pro => {
    let amortStopa = stopa;
    for (const istorijaAmortizacijeElement of istorijaAmortizacije) {
      if (pro.datum_od.diff(istorijaAmortizacijeElement.timestamp) <= 0) {
        amortStopa = istorijaAmortizacijeElement.amortizaciona_stopa;
        break;
      }
    }

    return {
      ...pro,
      amortizaciona_stopa: amortStopa.toFixed(2),
    };
  });
}

const mapiranjeIstorije = (istorija, podaci) => {
  const listaIstorije = [];

  istorija.forEach((istorijaElement, index) => {
    for (const istorijaElementKey in istorijaElement) {
      if (istorijaElement[istorijaElementKey] && !istorijaElementKey.startsWith('timestamp')) {
        const findNextChange = istorija.find((isto, indexPromjene) => isto[istorijaElementKey] !== null && indexPromjene > index);
        const naziv = `${istorijaElementKey.charAt(0).toUpperCase() + istorijaElementKey.slice(1)}`;
        listaIstorije.push({
          label: istorijaElement.timestamp_format,
          children: `${naziv} : ${istorijaElement[istorijaElementKey]} >> ${findNextChange ? findNextChange[istorijaElementKey] : podaci[istorijaElementKey]}`
        })
      }
    }
  })

  return listaIstorije;
}

const mapiranjePrenosnice = (prenosnice, sredstvo, orgJedinice) => {
  const listaPrenosnica = [];

  prenosnice.forEach((prenosnicaElement, index) => {
    const staraJedinicaNaziv = index === 0 ?
      orgJedinice.find(jedinica => jedinica.id === prenosnicaElement.organizaciona_jedinica_id)?.naziv ?? '' :
      listaPrenosnica[index - 1].nova_organizaciona_jedinica_naziv;
    const staraJedinicaSifra = index === 0 ?
      orgJedinice.find(jedinica => jedinica.id === prenosnicaElement.organizaciona_jedinica_id)?.sifra ?? '' :
      listaPrenosnica[index - 1].nova_organizaciona_jedinica_sifra;

    const novaJedinicaNaziv = prenosnice[index + 1] ?
      orgJedinice.find(jedinica => jedinica.id === prenosnice[index + 1].organizaciona_jedinica_id)?.naziv ?? '' :
      sredstvo.organizaciona_jedinica_naziv;
    const novaJedinicaSifra = prenosnice[index + 1] ?
      orgJedinice.find(jedinica => jedinica.id === prenosnice[index + 1].organizaciona_jedinica_id)?.sifra ?? '' :
      sredstvo.organizaciona_jedinica_sifra;

    listaPrenosnica.push({
      ...prenosnicaElement,
      organizaciona_jedinica_naziv: staraJedinicaNaziv,
      organizaciona_jedinica_sifra: staraJedinicaSifra,
      nova_organizaciona_jedinica_id: prenosnice[index + 1] ? prenosnice[index + 1].organizaciona_jedinica_id : sredstvo.organizaciona_jedinica_id,
      nova_organizaciona_jedinica_sifra: novaJedinicaSifra,
      nova_organizaciona_jedinica_naziv: novaJedinicaNaziv,
    })
  })

  return listaPrenosnica;
}

const mapiranjePregleda = (pregled, orgJedinice) => {
  const listaPregleda = [];

  pregled.forEach((pregledElement, index) => {
    const staraJedinicaNaziv =
      orgJedinice.find(jedinica => jedinica.id === pregledElement.organizaciona_jedinica_id)?.naziv ?? '';
    const staraJedinicaSifra =
      orgJedinice.find(jedinica => jedinica.id === pregledElement.organizaciona_jedinica_id)?.sifra ?? '';

    listaPregleda.push({
      ...pregledElement,
      id: index,
      organizaciona_jedinica_naziv: staraJedinicaNaziv,
      organizaciona_jedinica_sifra: staraJedinicaSifra,
    })
  })

  return listaPregleda;
}

export const dodajUrediSredstvo = (sredstvo, setSredstva, prikaziNotifikaciju, setLoading, jedinice, konti, jm, poreskeGrupe) => {
  setLoading(true);

  const metod = sredstvo.id ? 'azuriraj_osnovno_sredstvo' : 'kreiraj_osnovno_sredstvo';
  posaljiPodatke(metod, sredstvo).then(odg => {
    prikaziNotifikaciju(odg.greska ? 'error' : 'success', odg.poruka);

    if (!odg.greska) {
      if (!sredstvo.id) {
        povuciSredstva('', setSredstva, jedinice, konti, jm, poreskeGrupe, setLoading);
      } else {
        povuciPodatke(`dohvati_osnovno_sredstvo&id=${sredstvo.id}`).then(odg => {
          if (odg.greska) {
            setLoading(false);
            return prikaziNotifikaciju('error', odg.poruka);
          }

          const novoSredstvo = mapirajSredstva(mapiranjePodatakaSaBekenda(odg.osnovno_sredstvo), jedinice, konti, jm, poreskeGrupe)[0];

          setSredstva((prevSredstva) => {
            const novaSredstva = [...prevSredstva];

            const sredstvoIndex = novaSredstva.findIndex(sre => sre.id === sredstvo.id);
            if (sredstvoIndex !== -1) novaSredstva[sredstvoIndex] = novoSredstvo;

            return novaSredstva;
          })
          setLoading(false);
        })
      }
    } else setLoading(false);
  });
}

export const dodajPrenosnicu = (sredstvo, setSredstva, prikaziNotifikaciju, setLoading, setPodaci) => {
  setLoading(true);

  posaljiPodatke('kreiraj_prelaznicu', {
    sredstvo_id: sredstvo.id,
    organizaciona_jedinica_id: sredstvo.organizaciona_jedinica_id,
    nova_organizaciona_jedinica_id: sredstvo.nova_organizaciona_jedinica_id,
    datum_predaje: sredstvo.datum_predaje
  }).then(odg => {
    prikaziNotifikaciju(odg.greska ? 'error' : 'success', odg.poruka);

    if (!odg.greska) {
      setSredstva((prevSredstva) => {
        const novaSredstva = [...prevSredstva];

        const sredstvoIndex = novaSredstva.findIndex(sre => sre.id === sredstvo.id);
        if (sredstvoIndex !== -1) {
          const novoSredstvno = {
            ...novaSredstva[sredstvoIndex],
            organizaciona_jedinica_id: sredstvo.nova_organizaciona_jedinica_id,
            organizaciona_jedinica_sifra: sredstvo.nova_organizaciona_jedinica_sifra,
            organizaciona_jedinica_naziv: sredstvo.nova_organizaciona_jedinica_naziv
          }

          novoSredstvno.prenosnice = [...novaSredstva[sredstvoIndex].prenosnice];

          novoSredstvno.prenosnice.push({
            ...sredstvo,
            sredstvo_id: sredstvo.id,
            id: +odg.id,
            datum_predaje: dayjs(sredstvo.datum_predaje),
            datum_predaje_format: dayjs(sredstvo.datum_predaje).format(formatDatum),
          });

          novaSredstva[sredstvoIndex] = novoSredstvno;
          setPodaci({otvori: true, podaci: novoSredstvno});
        }

        setLoading(false);
        return novaSredstva;
      })
    } else setLoading(false);
  });
}

export const dodajOtpis = (sredstvo, setSredstva, prikaziNotifikaciju, setLoading) => {
  setLoading(true);

  posaljiPodatke('otpisi_sredstvo', {
    sredstvo_id: sredstvo.id,
    datum_otpisa: sredstvo.datum_otpisa.format(vrijemeFormatZaBazu),
    razlog_id: sredstvo.razlog_id
  }).then(odg => {
    prikaziNotifikaciju(odg.greska ? 'error' : 'success', odg.poruka);

    if (!odg.greska) {
      setSredstva((prevSredstva) => {
        const novaSredstva = [...prevSredstva];

        const sredstvoIndex = novaSredstva.findIndex(sre => sre.id === sredstvo.id);
        if (sredstvoIndex !== -1) {
          novaSredstva[sredstvoIndex] = {
            ...novaSredstva[sredstvoIndex],
            datum_otpisa: sredstvo.datum_otpisa,
            datum_otpisa_format: sredstvo.datum_otpisa_format,
            razlog_id: sredstvo.razlog_id
          };
        }

        setLoading(false);
        return novaSredstva;
      })
    } else setLoading(false);
  });
}

export const povuciKarticuSredstva = async (sredstvo, oragnizacioneJedinice, prikaziNotifikaciju, setLoading, setSredstva) => {
  let orgJedinice = [...oragnizacioneJedinice];
  if (orgJedinice.length === 0)
    povuciPodatke('dohvati_sve_organizacione_jedinice').then(rez => orgJedinice = (mapiranjePodatakaSaBekenda(rez['organizacione_jedinice'])));

  setLoading(true);
  let prometMapirani = [], trenutnoSredstvo;

  const odg = await povuciPodatke(`dohvati_karticu_sredstva&id_sredstva=${sredstvo.id}`);

  if (odg.greska) {
    trenutnoSredstvo = {...sredstvo, promet: [], istorija: [], prenosnice: []};
    setSredstva(prevState => {
      const novaSredstva = [...prevState];
      const trenutnoSredstvoIndex = novaSredstva.findIndex(sre => sre.id === sredstvo.id);
      novaSredstva[trenutnoSredstvoIndex] = trenutnoSredstvo;

      return novaSredstva;
    })
    setLoading(false);
  } else {
    const prenosniceData = odg.prenosnice?.data ?? [];

    const mapiranePrenosnice = prenosniceData.length > 0
      ? mapiranjePodatakaSaBekenda(odg.prenosnice)
      : [];

    const istorijaData = odg.istorija?.data ?? [];

    const mapiranaIstorija = istorijaData.length > 0
      ? mapiranjePodatakaSaBekenda(odg.istorija)
      : [];

    prometMapirani = mapirajPromet(mapiranjePodatakaSaBekenda(odg.promet), mapiranaIstorija, sredstvo.amortizaciona_stopa);


    setSredstva(prevState => {
      const novaSredstva = [...prevState];
      trenutnoSredstvo = novaSredstva.find(sre => sre.id === sredstvo.id);
      trenutnoSredstvo.promet = prometMapirani;
      trenutnoSredstvo.istorija = mapiranjeIstorije(mapiranaIstorija, sredstvo);
      trenutnoSredstvo.prenosnice = mapiranjePrenosnice(mapiranePrenosnice, sredstvo, orgJedinice);
      return novaSredstva;
    })

    setLoading(false);
  }

  return trenutnoSredstvo;
}

export const azurirajSredstvo = (id, promet, setSredstva, setObracuni) => {
  setSredstva(prevState => {
    const novaSredstva = [...prevState];
    const trenutnoSredstvo = novaSredstva.find(sre => sre.id === id);
    trenutnoSredstvo.promet = promet;
    trenutnoSredstvo.sadasnja_vrijednost = promet[promet.length - 1].sadasnja_vrijednost;
    return novaSredstva;
  })

  setObracuni(prevState => {
    const trenutniPromet = promet[promet.length - 1];
    const noviObracuni = [...prevState];
    if (noviObracuni.findIndex(ob => ob.id === trenutniPromet.id) === -1) noviObracuni.push({
      id: trenutniPromet.id,
      datum_od: trenutniPromet.datum_od,
      datum_od_format: trenutniPromet.datum_od_format,
      datum_do: trenutniPromet.datum_do,
      datum_do_format: trenutniPromet.datum_do_format,
      sva_sredstva: 0,
      proknjizeno: 0,
      broj: 1,
      nova_ukupna_vrijednost: trenutniPromet.sadasnja_vrijednost,
      ukupna_amortizacija: trenutniPromet.ispravka_vrijednosti
    })

    return noviObracuni;
  })
}

export const azurirajObracun = (id, setObracuni, obrisi = false) => {
  if (obrisi) {
    setObracuni(prevState => {
      const noviObracuni = [...prevState];
      const noviObracunIndex = noviObracuni.findIndex(ob => ob.id === id);
      if (noviObracunIndex !== -1) noviObracuni.splice(noviObracunIndex, 1);
      return noviObracuni;
    });
    return;
  }

  povuciPodatke(`dohvati_obracun&id=${id}`).then(odg => {
    if (!odg.greska) {
      setObracuni(prevState => {
        const noviObracuni = [...prevState];
        const noviObracun = mapiranjePodatakaSaBekenda(odg.obracun)[0];

        const noviObracunIndex = noviObracuni.findIndex(ob => ob.id === id);
        if (noviObracunIndex !== -1) noviObracuni[noviObracunIndex] = noviObracun;
        else noviObracuni.push(noviObracun);
        return noviObracuni;
      });
    }
  })
}

export const povuciPregledObracuna = async (obracun, oragnizacioneJedinice, prikaziNotifikaciju, setLoading, setObracuni) => {
  setLoading(true);

  let orgJedinice = [...oragnizacioneJedinice];
  if (orgJedinice.length === 0) {
    const odg = await povuciPodatke('dohvati_sve_organizacione_jedinice');
    orgJedinice = mapiranjePodatakaSaBekenda(odg['organizacione_jedinice']);
  }

  let trenutniObracun;

  const response = await povuciPodatke(`dohvati_pregled_obracuna&id=${obracun.id}`);

  if (response.greska) {
    trenutniObracun = {...obracun, pregled: []};
  } else {
    const pregledData = response.pregled?.data ?? [];

    const mapiraniPregled = pregledData.length > 0
      ? mapiranjePregleda(mapiranjePodatakaSaBekenda(response.pregled), orgJedinice)
      : [];

    trenutniObracun = {...obracun, pregled: mapiraniPregled};
  }

  setObracuni(prevState => {
    const noviObracuni = [...prevState];
    const trenutniObracunIndex = noviObracuni.findIndex(sre => sre.id === obracun.id);
    noviObracuni[trenutniObracunIndex] = trenutniObracun;

    return noviObracuni;
  })
  setLoading(false);

  return trenutniObracun;
}