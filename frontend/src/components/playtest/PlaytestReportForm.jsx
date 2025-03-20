import { useEffect, useState } from 'react';
import ChatLeftQuoteFill from '@icons/chat-left-quote-fill.svg?react';
import ChevronBarContract from '@icons/chevron-bar-contract.svg?react';
import ChevronBarExpand from '@icons/chevron-bar-expand.svg?react';
import {
  Button,
  Checkbox,
  ConditionalTooltipOrModal,
  Input,
  InputLabel,
  PlaytestScores,
  Textarea,
} from '@/components';
import { CARDS, ID, PRECONS, SCORE, TEXT, VALUE } from '@/constants';
import { useApp } from '@/context';
import { useFetch } from '@/hooks';
import { playtestServices } from '@/services';

const IS_PLAYED = 'isPlayed';

const Title = ({ isPrecon }) => {
  return (
    <div className="text-fgSecondary dark:text-fgSecondaryDark flex gap-3 font-bold whitespace-nowrap">
      Playtest Report:
      <ConditionalTooltipOrModal
        title="Public name"
        overlay={
          <div className="flex flex-col gap-2">
            <div>
              Please consult with your playtest coordinator how to properly report. They may have
              more specific guidelines.
            </div>
            <div>
              Score represent how STRONG {isPrecon ? 'precon' : 'card'} is, not how balanced or
              well-designed it is:
            </div>
            <div>
              1-Star is Useless/Unplayable, 10-Star is Overpowered/Broken. Please leave more
              detailed feedback in report field to backup your score, especially if it is very low
              or high.
            </div>
            <div>
              Your entry will be preserved during playtest round and you can update it as you wish
              until the round is over. At the end of the round coordinators will automatically
              receive scores and text report you filled.
            </div>
            <div>
              You can leave many different thoughts (&apos;reports&apos;) in the text field. Please
              separate them by empty line to make it easier for coordinators to understand.
            </div>
            <div>To clear Scores click same Star again. It will not clear text form.</div>
          </div>
        }
      >
        <div className="text-fgThird dark:text-fgThirdDark font-bold">[?]</div>
      </ConditionalTooltipOrModal>
    </div>
  );
};

const PlaytestReportForm = ({ id, setIsHotkeysDisabled, isPrecon = false }) => {
  const { isMobile } = useApp();
  const [isFolded, setIsFolded] = useState(true);
  const [report, setReport] = useState({
    [TEXT]: '',
    [SCORE]: 0,
    [IS_PLAYED]: false,
    [ID]: null,
  });

  const url = `${import.meta.env.VITE_API_URL}/playtest/${isPrecon ? PRECONS : CARDS}/${id}`;
  const { [VALUE]: dataValue } = useFetch(url, {}, [id]);

  useEffect(() => {
    if (dataValue) {
      setReport({
        [TEXT]: dataValue[TEXT],
        [SCORE]: dataValue[SCORE],
        [IS_PLAYED]: !!dataValue[IS_PLAYED],
        [ID]: id,
      });
    }
  }, [dataValue]);

  useEffect(() => {
    if (
      dataValue &&
      (report[SCORE] !== dataValue[SCORE] || report[IS_PLAYED] !== dataValue[IS_PLAYED])
    ) {
      submit();
    }
  }, [report[SCORE], report[IS_PLAYED]]);

  const submit = (event) => {
    event?.preventDefault();
    playtestServices.submitReport(report[ID], report, isPrecon);
  };

  const handleOnBlur = () => {
    if (setIsHotkeysDisabled) setIsHotkeysDisabled(false);
    if (report[TEXT] !== dataValue[TEXT]) submit();
  };

  const handleIsPlayedChange = (event) => {
    setReport((prevState) => ({ ...prevState, [IS_PLAYED]: !event.currentTarget.value }));
  };

  const handleScoreChange = (value) => {
    setReport((prevState) => ({ ...prevState, [SCORE]: value === prevState[SCORE] ? 0 : value }));
  };

  const handleTextChange = (event) => {
    setReport((prevState) => ({ ...prevState, [TEXT]: event.target.value }));
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <Title />
        {isMobile && (
          <Checkbox
            label="seen in play"
            value={report[IS_PLAYED]}
            checked={report[IS_PLAYED]}
            onChange={handleIsPlayedChange}
          />
        )}
      </div>
      <div className="flex w-full items-center justify-between gap-4">
        <PlaytestScores value={report[SCORE]} handleClick={handleScoreChange} />
        {!isMobile && (
          <Checkbox
            label="seen in play"
            value={report[IS_PLAYED]}
            checked={report[IS_PLAYED]}
            onChange={handleIsPlayedChange}
          />
        )}
      </div>
      <form className="flex" onSubmit={submit}>
        <InputLabel title="Description">
          <ChatLeftQuoteFill width="20" height="18" viewBox="0 0 16 16" />
        </InputLabel>
        {isFolded ? (
          <Input
            placeholder="Write playtest report here"
            value={report[TEXT]}
            onChange={handleTextChange}
            onBlur={handleOnBlur}
            borderStyle="border-y"
            roundedStyle="rounded-none"
            onFocus={() => {
              if (setIsHotkeysDisabled) setIsHotkeysDisabled(true);
            }}
          />
        ) : (
          <Textarea
            className="w-full"
            rows={12}
            value={report[TEXT]}
            onChange={handleTextChange}
            onBlur={handleOnBlur}
            borderStyle="border-y"
            roundedStyle="rounded-none"
            onFocus={() => {
              if (setIsHotkeysDisabled) setIsHotkeysDisabled(true);
            }}
          />
        )}
        <Button
          roundedStyle="rounded-r"
          title="Collapse/Uncollapse Description"
          onClick={() => setIsFolded(!isFolded)}
        >
          {isFolded ? <ChevronBarExpand /> : <ChevronBarContract />}
        </Button>
      </form>
    </div>
  );
};

export default PlaytestReportForm;
