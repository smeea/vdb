import React, { useState, useContext } from 'react';
import { InventoryCryptTable, InventoryFilterForm } from 'components';
import AppContext from 'context/AppContext.js';

function InventoryCrypt(props) {
  const { usedCryptCards, cryptCardBase } = useContext(AppContext);
  const [clan, setClan] = useState('All');

  const cryptByClan = {};
  const cryptByClanTotal = {};
  const cryptByClanUnique = {};
  const missingCryptByClan = {};
  const missingCryptByClanTotal = {};

  const clansSorted = [
    'All',
    'Abomination',
    'Ahrimane',
    'Akunanse',
    'Assamite',
    'Baali',
    'Blood Brother',
    'Brujah',
    'Brujah antitribu',
    'Caitiff',
    'Daughter of Cacophony',
    'Follower of Set',
    'Gangrel',
    'Gangrel antitribu',
    'Gargoyle',
    'Giovanni',
    'Guruhi',
    'Harbinger of Skulls',
    'Ishtarri',
    'Kiasyd',
    'Lasombra',
    'Malkavian',
    'Malkavian antitribu',
    'Nagaraja',
    'Nosferatu',
    'Nosferatu antitribu',
    'Osebo',
    'Pander',
    'Ravnos',
    'Salubri',
    'Salubri antitribu',
    'Samedi',
    'Toreador',
    'Toreador antitribu',
    'Tremere',
    'Tremere antitribu',
    'True Brujah',
    'Tzimisce',
    'Ventrue',
    'Ventrue antitribu',
    'Avenger',
    'Defender',
    'Innocent',
    'Judge',
    'Martyr',
    'Redeemer',
    'Visionary',
  ];

  clansSorted.map((i) => {
    cryptByClan[i] = {};
    cryptByClanTotal[i] = 0;
    cryptByClanUnique[i] = 0;
    missingCryptByClan[i] = {};
    missingCryptByClanTotal[i] = 0;
  });

  if (props.compact) {
    Object.keys(props.cards).map((card) => {
      cryptByClan['All'] = {
        card: props.cards[card],
      };
    });
  } else {
    Object.keys(props.cards).map((card) => {
      const i = props.cards[card].c['Clan'];

      if (props.cards[card].q > 0) {
        cryptByClanTotal[i] += props.cards[card].q;
        cryptByClanTotal['All'] += props.cards[card].q;
        cryptByClanUnique[i] += 1;
        cryptByClanUnique['All'] += 1;
      }

      let softUsedMax = 0;
      if (usedCryptCards.soft[card]) {
        Object.keys(usedCryptCards.soft[card]).map((id) => {
          if (softUsedMax < usedCryptCards.soft[card][id]) {
            softUsedMax = usedCryptCards.soft[card][id];
          }
        });
      }

      let hardUsedTotal = 0;
      if (usedCryptCards.hard[card]) {
        Object.keys(usedCryptCards.hard[card]).map((id) => {
          hardUsedTotal += usedCryptCards.hard[card][id];
        });
      }

      const miss = softUsedMax + hardUsedTotal - props.cards[card].q;

      if (miss > 0) {
        missingCryptByClan[i][card] = { q: miss, c: props.cards[card].c };
        missingCryptByClan['All'][card] = {
          q: miss,
          c: props.cards[card].c,
        };
      }

      if (props.category == 'nok') {
        if (miss > 0) {
          cryptByClan[card] = props.cards[card];
          cryptByClan['All'][card] = props.cards[card];
        }
      } else {
        cryptByClan[i][card] = props.cards[card];
        cryptByClan['All'][card] = props.cards[card];
      }
    });

    Object.keys(usedCryptCards.soft).map((card) => {
      if (!props.cards[card]) {
        const i = cryptCardBase[card]['Clan'];

        if (props.category != 'ok') {
          cryptByClan[i][card] = { q: 0, c: cryptCardBase[card] };
          cryptByClan['All'][card] = { q: 0, c: cryptCardBase[card] };
        }

        let softUsedMax = 0;
        Object.keys(usedCryptCards.soft[card]).map((id) => {
          if (softUsedMax < usedCryptCards.soft[card][id]) {
            softUsedMax = usedCryptCards.soft[card][id];
          }
        });

        missingCryptByClan[i][card] = {
          q: softUsedMax,
          c: cryptCardBase[card],
        };
        missingCryptByClan['All'][card] = {
          q: softUsedMax,
          c: cryptCardBase[card],
        };
      }
    });

    Object.keys(usedCryptCards.hard).map((card) => {
      if (!props.cards[card]) {
        const i = cryptCardBase[card]['Clan'];

        if (props.category != 'ok') {
          cryptByClan[i][card] = { q: 0, c: cryptCardBase[card] };
          cryptByClan['All'][card] = { q: 0, c: cryptCardBase[card] };
        }

        let hardUsedTotal = 0;
        if (usedCryptCards.hard[card]) {
          Object.keys(usedCryptCards.hard[card]).map((id) => {
            hardUsedTotal += usedCryptCards.hard[card][id];
          });
        }

        if (missingCryptByClan[i][card]) {
          missingCryptByClan[i][card].q += hardUsedTotal;
          missingCryptByClan['All'][card].q += hardUsedTotal;
        } else {
          missingCryptByClan[i][card] = {
            q: hardUsedTotal,
            c: cryptCardBase[card],
          };
          missingCryptByClan['All'][card] = {
            q: hardUsedTotal,
            c: cryptCardBase[card],
          };
        }
      }
    });

    Object.keys(missingCryptByClan).map((i) => {
      Object.values(missingCryptByClan[i]).map((card) => {
        missingCryptByClanTotal[i] += card.q;
      });
    });
  }

  return (
    <>
      {!props.compact && (
        <div className="d-flex align-items-center justify-content-between px-1 inventory-info">
          <div className="w-70 py-1">
            <InventoryFilterForm
              value={clan}
              setValue={setClan}
              values={Object.keys(cryptByClan).filter((i) => {
                return Object.keys(cryptByClan[i]).length;
              })}
              byTotal={cryptByClanTotal}
              byUnique={cryptByClanUnique}
              target="crypt"
            />
          </div>
          <div className="d-inline gray px-1">
            <b>
              {missingCryptByClanTotal[clan] ? (
                <>
                  {missingCryptByClanTotal[clan]} (
                  {Object.values(missingCryptByClan[clan]).length} uniq) miss
                </>
              ) : null}
            </b>
          </div>
        </div>
      )}
      <InventoryCryptTable
        compact={props.compact}
        withCompact={props.withCompact}
        cards={Object.values(cryptByClan[clan])}
        showFloatingButtons={props.showFloatingButtons}
        setShowFloatingButtons={props.setShowFloatingButtons}
      />
    </>
  );
}

export default InventoryCrypt;
