import React, { useState, useEffect } from 'react';
import ChevronBarExpand from '@/assets/images/icons/chevron-bar-expand.svg?react';
import ChevronBarContract from '@/assets/images/icons/chevron-bar-contract.svg?react';
import ChatLeftQuoteFill from '@/assets/images/icons/chat-left-quote-fill.svg?react';
import {
  Button,
  Input,
  InputLabel,
  Textarea,
  ConditionalTooltipOrModal,
  PlaytestScores,
  Checkbox,
} from '@/components';
import { useFetch } from '@/hooks';
import { useApp } from '@/context';
import { playtestServices } from '@/services';
import { PRECONS, CARDS } from '@/utils/constants';

const Title = ({ isPrecon }) => {
  return (
    <div className="flex gap-3 whitespace-nowrap font-bold text-fgSecondary dark:text-fgSecondaryDark">
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
        <div className="font-bold text-fgThird dark:text-fgThirdDark">[?]</div>
      </ConditionalTooltipOrModal>
    </div>
  );
};

const PlaytestReportForm = ({ id, setIsHotkeysDisabled, isPrecon = false }) => {
  const { isMobile } = useApp();

  const [text, setText] = useState('');
  const [score, setScore] = useState(0);
  const [isPlayed, setIsPlayed] = useState(false);
  const [isFolded, setIsFolded] = useState(true);

  const url = `${import.meta.env.VITE_API_URL}/playtest/${isPrecon ? PRECONS : CARDS}/${id}`;
  const { value: dataValue } = useFetch(url, {}, [id]);

  useEffect(() => {
    if (dataValue) {
      setScore(dataValue.score);
      setText(dataValue.text);
      setIsPlayed(!!dataValue.isPlayed);
    }
  }, [id, dataValue]);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const submit = (t, s, i) => {
    playtestServices.submitReport(
      id,
      {
        text: t,
        score: s,
        isPlayed: i,
      },
      isPrecon,
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submit(text, score, isPlayed);
  };

  const handleOnBlur = () => {
    if (setIsHotkeysDisabled) setIsHotkeysDisabled(false);
    if (text !== dataValue.text) {
      submit(text, score, isPlayed);
    }
  };

  const handleIsPlayedChange = (event) => {
    setIsPlayed(event.target.checked);
    submit(text, score, event.target.checked);
  };

  const handleScoreChange = (value) => {
    const result = value == score ? 0 : value;
    setScore(result);
    submit(text, result, isPlayed);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <Title />
        {isMobile && (
          <Checkbox label="seen in play" checked={isPlayed} onChange={handleIsPlayedChange} />
        )}
      </div>
      <div className="flex w-full items-center justify-between gap-4">
        <PlaytestScores value={score} handleClick={handleScoreChange} />
        {!isMobile && (
          <Checkbox label="seen in play" checked={isPlayed} onChange={handleIsPlayedChange} />
        )}
      </div>
      <form className="flex" onSubmit={handleSubmit}>
        <InputLabel title="Description">
          <ChatLeftQuoteFill width="20" height="18" viewBox="0 0 16 16" />
        </InputLabel>
        {isFolded ? (
          <Input
            placeholder="Write playtest report here"
            value={text}
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
            value={text}
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
