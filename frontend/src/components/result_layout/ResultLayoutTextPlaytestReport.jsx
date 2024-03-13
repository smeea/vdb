import React, { useState, useEffect } from 'react';
import ChevronBarExpand from '@/assets/images/icons/chevron-bar-expand.svg?react';
import ChevronBarContract from '@/assets/images/icons/chevron-bar-contract.svg?react';
import ChatLeftQuoteFill from '@/assets/images/icons/chat-left-quote-fill.svg?react';
import Star from '@/assets/images/icons/star.svg?react';
import StarFill from '@/assets/images/icons/star-fill.svg?react';
import { ButtonClose, Input, InputLabel, Textarea, Button } from '@/components';
import { useFetch } from '@/hooks';
import { playtestServices } from '@/services';

const Scores = ({ value, handleClick }) => {
  const SIZE = 24;

  return (
    <div className="flex px-1 gap-2">
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

const ResultLayoutPlaytestReport = ({ cardid }) => {
  const [text, setText] = useState('');
  const [score, setScore] = useState(0);
  const [isFolded, setIsFolded] = useState(true);

  const url = `${import.meta.env.VITE_API_URL}/playtest/cards/${cardid}`;
  const { value: dataValue } = useFetch(url, {}, [cardid]);

  useEffect(() => {
    if (dataValue) {
      setScore(dataValue.score);
      setText(dataValue.text);
    }
  }, [cardid, dataValue]);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const submit = (t, s) => {
    playtestServices.submitReport(cardid, {
      text: t,
      score: s,
    });
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
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
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
