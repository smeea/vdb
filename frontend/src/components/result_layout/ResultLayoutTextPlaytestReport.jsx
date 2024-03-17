import React, { useState, useEffect } from 'react';
import ChevronBarExpand from '@/assets/images/icons/chevron-bar-expand.svg?react';
import ChevronBarContract from '@/assets/images/icons/chevron-bar-contract.svg?react';
import ChatLeftQuoteFill from '@/assets/images/icons/chat-left-quote-fill.svg?react';
import Star from '@/assets/images/icons/star.svg?react';
import StarFill from '@/assets/images/icons/star-fill.svg?react';
import {
  Button,
  ButtonClose,
  Input,
  InputLabel,
  Textarea,
  ConditionalTooltipOrModal,
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

const Scores = ({ value, handleClick }) => {
  const { isMobile } = useApp();
  const SIZE = isMobile ? '22' : '24';

  return (
    <div className="flex px-1 gap-1.5 sm:gap-2">
      {Array.apply(null, Array(10)).map((i, idx) => {
        return (
          <div
            className="flex cursor-pointer"
            onClick={() => handleClick(idx + 1)}
            key={idx}
          >
            {idx < value ? (
              <StarFill width={SIZE} height={SIZE} />
            ) : (
              <Star width={SIZE} height={SIZE} />
            )}
          </div>
        );
      })}
    </div>
  );
};

const ResultLayoutPlaytestReport = ({ id, isPrecon = false }) => {
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
        <Scores value={score} handleClick={handleScoreChange} />
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

export default ResultLayoutPlaytestReport;
