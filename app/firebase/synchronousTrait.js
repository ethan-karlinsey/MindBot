import { useState } from 'react';

export default function synchronousTrait(initialValue) {
    const [trait, updateTrait] = useState(initialValue);
  
    let current = trait;
  
    const get = () => current;
  
    const set = newValue => {
       current = newValue;
       updateTrait(newValue);
       return current;
    }
  
    return {
       get,
       set,
    }
}