The assignment is create reusable 'TagInput' that allows users to enter and manage  multiple tags.  This component should be well-structured, flexible, and properly documented.

1. add tags by typing and pressing Enter or clicking away(blur)
2. remove tags by clicking x
3. prevent duplicate
4. responsive layout


Usage (import the TagInput.tsx and TagInput.css then run)

import React from 'react';
import TagInput from './TagInput';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>My Tag Input Demo</h1>
      <TagInput 
        placeholder="Placeholder"
        maxTags={10}
      />
    </div>
  );
}

export default App;

Example behavior
1. type tag1,tag2,tag3 then enter -> [tag1] [tag2] [tag3] (seperator can be comma, semicolon or space)
2. prevent space such as " tag3 " -> [tag3]
3. duplicate tag will ignore
4. meet max tag will not allow add more tag