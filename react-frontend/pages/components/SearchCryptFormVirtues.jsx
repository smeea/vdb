import React from 'react';

function SearchCryptFormVirtues(props) {
  const virtues = [
    'Defense',
    'Innocence',
    'Judgment',
    'Martyrdom',
    'Redemption',
    'Vengeance',
    'Vision',
  ];

  const virtuesforms = virtues.map((i, index) => {
    const imgSrc = `${
      process.env.ROOT_URL
    }images/disciplines/${i.toLowerCase()}.svg`;
    const virtueState = 'virtue-container mb-2 state' + props.value[i];
    return (
      <div key={index} className={virtueState}>
        <label
          className="virtue-container d-flex justify-content-center align-items-center"
          htmlFor={i}
        >
          <input
            className="d-none"
            type="button"
            name="virtues"
            id={i}
            onClick={(e) => props.onChange(e)}
          />
          <img className="virtue-image" title={i} src={imgSrc} />
        </label>
      </div>
    );
  });

  return <div className="input-group">{virtuesforms}</div>;
}

export default SearchCryptFormVirtues;
