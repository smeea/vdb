import React from 'react';
import { useSnapshot } from 'valtio';
import Select from 'react-select';
import EyeFill from '@/assets/images/icons/eye-fill.svg';
import {
  UsedPopover,
  DeckCardQuantity,
  ResultLibraryTableRowCommon,
  CardImage,
  Tooltip,
  ConditionalTooltip,
  Checkbox,
} from '@/components';
import setsAndPrecons from '@/assets/data/setsAndPrecons.json';
import { useApp, usedStore, inventoryStore } from '@/context';
import { getSoftMax, getHardTotal } from '@/utils';

const DeckProxyLibraryTableRow = ({
  handleClick,
  proxySelected,
  handleProxySelector,
  handleProxyCounter,
  handleSetSelector,
  placement,
  inventoryType,
  card,
  idx,
}) => {
  const { inventoryMode, isMobile } = useApp();
  const inventoryLibrary = useSnapshot(inventoryStore).library;
  const usedLibrary = useSnapshot(usedStore).library;

  const inInventory = inventoryLibrary[card.c.Id]?.q ?? 0;
  const softUsedMax = getSoftMax(usedLibrary.soft[card.c.Id]) ?? 0;
  const hardUsedTotal = getHardTotal(usedLibrary.hard[card.c.Id]) ?? 0;

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
            {" '"}
            {setsAndPrecons[i].date.slice(2, 4)}
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
      <ResultLibraryTableRowCommon
        card={card.c}
        handleClick={handleClick}
        placement={placement}
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
              placement="left"
              overlay={
                <div>
                  <CardImage
                    card={card.c}
                    set={
                      proxySelected[card.c.Id] && proxySelected[card.c.Id].set
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

export default DeckProxyLibraryTableRow;
