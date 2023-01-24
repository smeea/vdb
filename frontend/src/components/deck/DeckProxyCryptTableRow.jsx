import React from 'react';
import { useSnapshot } from 'valtio';
import Select from 'react-select';
import EyeFill from '@/assets/images/icons/eye-fill.svg';
import {
  UsedPopover,
  DeckCardQuantity,
  ResultCryptTableRowCommon,
  CardImage,
  Tooltip,
  ConditionalTooltip,
  Checkbox,
} from '@/components';
import { getSoftMax, getHardTotal } from '@/utils';
import setsAndPrecons from '@/assets/data/setsAndPrecons.json';
import { useApp, usedStore, inventoryStore } from '@/context';

const DeckProxyCryptTableRow = ({
  proxySelected,
  handleProxySelector,
  handleProxyCounter,
  handleSetSelector,
  placement,
  disciplinesSet,
  keyDisciplines,
  nonKeyDisciplines,
  maxDisciplines,
  inventoryType,
  card,
  idx,
  handleClick,
}) => {
  const { inventoryMode, isMobile, setShowFloatingButtons } = useApp();
  const inventoryCrypt = useSnapshot(inventoryStore).crypt;
  const usedCrypt = useSnapshot(usedStore).crypt;
  const inInventory = inventoryCrypt[card.c.Id]?.q ?? 0;
  const softUsedMax = getSoftMax(usedCrypt.soft[card.c.Id]) ?? 0;
  const hardUsedTotal = getHardTotal(usedCrypt.hard[card.c.Id]) ?? 0;

  const setOptions = [
    {
      value: '',
      id: card.c.Id,
      label: <div className="text-xs">Newest (default)</div>,
    },
  ];

  Object.keys(setsAndPrecons).map((i) => {
    if (card.c['Set'][i] && i !== 'POD') {
      setOptions.push({
        value: i.toLowerCase(),
        id: card.c.Id,
        label: (
          <div className="text-xs">
            {setsAndPrecons[i].name}
            {setsAndPrecons[i].date
              ? ` '${setsAndPrecons[i].date.slice(2, 4)}`
              : null}
          </div>
        ),
      });
    }
  });

  return (
    <tr
      key={card.c.Id}
      className={`border-y border-bgSecondary dark:border-bgSecondaryDark ${
        idx % 2
          ? 'bg-bgThird dark:bg-bgThirdDark'
          : 'bg-bgPrimary dark:bg-bgPrimaryDark'
      }`}
    >
      <td className="proxy-selector">
        <Checkbox
          id={card.c.Id}
          name="print"
          checked={
            proxySelected[card.c.Id] ? proxySelected[card.c.Id].print : false
          }
          onChange={handleProxySelector}
        />
      </td>
      <td className="quantity">
        <ConditionalTooltip
          placement="right"
          overlay={<UsedPopover cardid={card.c.Id} />}
          disabled={!inventoryMode}
        >
          <DeckCardQuantity
            card={card.c}
            deckid={null}
            q={proxySelected[card.c.Id] ? proxySelected[card.c.Id].q : 0}
            inInventory={inInventory}
            inventoryType={inventoryType}
            softUsedMax={softUsedMax}
            hardUsedTotal={hardUsedTotal}
            cardChange={handleProxyCounter}
            isSelected={
              proxySelected[card.c.Id] && proxySelected[card.c.Id].print
            }
            inProxy
          />
        </ConditionalTooltip>
      </td>
      <ResultCryptTableRowCommon
        card={card.c}
        handleClick={handleClick}
        placement={placement}
        maxDisciplines={maxDisciplines}
        keyDisciplines={keyDisciplines}
        nonKeyDisciplines={nonKeyDisciplines}
        disciplinesSet={disciplinesSet}
        inDeck
      />
      {!isMobile && (
        <>
          <td className="proxy-set">
            <Select
              classNamePrefix="react-select"
              options={setOptions}
              isSearchable={false}
              name="set"
              placeholder="Set"
              value={setOptions.find((obj) => {
                if (proxySelected[card.c.Id] && proxySelected[card.c.Id].set) {
                  obj.value === proxySelected[card.c.Id].set.toLowerCase();
                }
              })}
              onChange={handleSetSelector}
            />
          </td>
          <td className="proxy-set-image">
            <Tooltip
              placement="right"
              overlay={
                <div>
                  <CardImage
                    card={card.c}
                    set={
                      proxySelected[card.c.Id]
                        ? proxySelected[card.c.Id].set
                        : null
                    }
                  />
                </div>
              }
            >
              <div>
                <EyeFill />
              </div>
            </Tooltip>
          </td>
        </>
      )}
    </tr>
  );
};

export default DeckProxyCryptTableRow;
