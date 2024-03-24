import React, { useState, useEffect } from 'react';
import ChevronBarExpand from '@/assets/images/icons/chevron-bar-expand.svg?react';
import ChevronBarContract from '@/assets/images/icons/chevron-bar-contract.svg?react';
import ChatLeftQuoteFill from '@/assets/images/icons/chat-left-quote-fill.svg?react';
import {
  Button,
  ButtonClose,
  Input,
  InputLabel,
  Textarea,
  ConditionalTooltipOrModal,
  PlaytestScores,
} from '@/components';
import { useFetch } from '@/hooks';
import { useApp } from '@/context';
import { playtestServices } from '@/services';

const Title = () => {
  const { isMobile } = useApp();

  return (
    <div className="flex whitespace-nowrap gap-3 font-bold text-fgSecondary dark:text-fgSecondaryDark">
      Playtest Report:
      <ConditionalTooltipOrModal
        title="Public name"
        isModal={isMobile}
        overlay={
          <div className="flex flex-col gap-2">
            <div>
              BETA FEATURE! Please consult with your playtest coordinator how to
              properly report.
            </div>
            <div>
              There is no &apos;submit&apos;. Your entry will be preserved
              during playtest round and you can update it as you wish until the
              round is over. At the end of the round coordinators will
              automatically receive scores and text report you filled.
            </div>
          </div>
        }
      >
        <div className="font-bold text-fgThird dark:text-fgThirdDark">[?]</div>
      </ConditionalTooltipOrModal>
    </div>
  );
};

const PlaytestReportForm = ({ id, setIsHotkeysDisabled, isPrecon = false }) => {
  const [text, setText] = useState('');
  const [score, setScore] = useState(0);
  const [isFolded, setIsFolded] = useState(true);

  const url = `${import.meta.env.VITE_API_URL}/playtest/${
    isPrecon ? 'precons' : 'cards'
  }/${id}`;
  const { value: dataValue } = useFetch(url, {}, [id]);

  useEffect(() => {
    if (dataValue) {
      setScore(dataValue.score);
      setText(dataValue.text);
    }
  }, [id, dataValue]);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const submit = (t, s) => {
    playtestServices.submitReport(
      id,
      {
        text: t,
        score: s,
      },
      isPrecon
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submit(text, score);
  };

  const handleOnBlur = () => {
    if (setIsHotkeysDisabled) setIsHotkeysDisabled(false);
    if (text !== dataValue.text) {
      submit(text, score);
    }
  };

  const handleScoreChange = (value) => {
    setScore(value);
    submit(text, value);
  };

  return (
    <div className="flex flex-col gap-2">
      {!isPrecon && <Title />}
      <div className="flex w-full items-center gap-3 justify-between">
        {isPrecon && <Title />}
        <PlaytestScores value={score} handleClick={handleScoreChange} />
        <ButtonClose
          title="Clear Score"
          handleClick={() => handleScoreChange(0)}
        />
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
          variant="primary"
          onClick={() => setIsFolded(!isFolded)}
        >
          {isFolded ? <ChevronBarExpand /> : <ChevronBarContract />}
        </Button>
      </form>
    </div>
  );
};

export default PlaytestReportForm;
