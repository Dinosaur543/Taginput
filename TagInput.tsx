import React, { useState, KeyboardEvent, ChangeEvent, FocusEvent } from 'react';
import './TagInput.css';

interface TagInputProps {
  placeholder?: string;
  maxTags?: number;
}

const TagInput: React.FC<TagInputProps> = ({
  placeholder = 'Placeholder',
  maxTags,
}) => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addTags = (input: string) => {
    const separators = /[,\s;]/; //include comma, space or semicolon

    const parts = input
      .split(separators)
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const uniqueTags = Array.from(new Set(parts)).filter(
      tag => !tags.includes(tag)
    );

    let allowedTags = uniqueTags;
    if (maxTags) {
      const remaining = Math.max(0, maxTags - tags.length);
      allowedTags = uniqueTags.slice(0, remaining);
    }

    if (allowedTags.length > 0) {
      setTags(prev => [...prev, ...uniqueTags]);
      setInputValue('');
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { // ,
      e.preventDefault();
      addTags(inputValue);
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    addTags(inputValue); //if mouse away from inputbox the current input value will be a tag
  };

  const handleRemove = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="tag-input-container">
      <div className="tags-list">
        {tags.map((tag, index) => (
          <div key={index} className="tag">
            {tag}
            <button onClick={() => handleRemove(index)} className="tag-remove">x</button>
          </div>
        ))}
        {(maxTags === undefined || tags.length < maxTags) && (
          <input
            type="text"
            value={inputValue}
            onChange={handleInput}
            onKeyDown={handleKey}
            onBlur={handleBlur}
            // placeholder={placeholder}
            placeholder={tags.length === 0 ? placeholder : ''}
            className="tag-input"
          />
        )}
      </div>
    </div>
  );
};

export default TagInput;
