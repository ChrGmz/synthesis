import * as Tone from 'tone';
import { useRef } from 'react';
import effectsList from '../components/effects';
import { Effect } from '../context/stateReducer';
const { Scale, Chord, Note } = require('@tonaljs/tonal');

export type TimeoutRef = {
  current: ReturnType<typeof setTimeout> | null,
}

function randomChordProgression(root: string = 'C', octave: number = 4, scale: string) {
  const scaleName: string = `${root} ${scale}`;

  const scaleNotes: string = Scale.get(scaleName).notes;

  const chordGen: string = scaleNotes.concat(scaleNotes);

  const newChord: (string | number)[] = [];

  for (let i = 0; i < scaleNotes.length; i++) {
    const noteIdx: number = randomNumberGenerator(scaleNotes.length - 1);
    newChord.push(
      chordGen[noteIdx] + octave,
      chordGen[noteIdx + 2] + octave,
      chordGen[noteIdx + 4] + octave
    );
  }

  console.log(newChord);
  return newChord.slice(0, 16);
  // const scaleName = `${root} ${scale}`;
  // const scaleNotes = shuffle(Scale.get(scaleName).notes).slice(0,4)
  // const scaleChords = shuffle(Scale.scaleChords(scaleName)
  //   .filter((chord) => chord.length <= 2))
  //   .slice(0, 4);

  // const progression = [];

  // for (let i = 0; i < 16; i++) {
  //   const noteIdx = randomNumberGenerator(scaleNotes.length - 1);
  //   const chordIdx = randomNumberGenerator(scaleChords.length - 1);

  //   const chord = scaleNotes[noteIdx] + scaleChords[chordIdx];
  //   const notes = Chord.get(chord).notes;
  // const _note = scaleNotes[noteIdx];

  // const note = Note.simplify(_note);
  // progression.push(note + octave);

  // progression.push(notes.map((note) => note + octave));

  // scaleNotes.forEach((note) => progression.push(note + octave));
  //   notes.forEach((_note) => {
  //     const note = Note.simplify(_note);
  //     progression.push(note + octave);
  //   });
  // }

  // return progression.slice(0, 16);
}

function randomNumberGenerator(max: number): number {
  return Math.floor(Math.random() * max);
}

function shuffle(arr: (string | number)[]): (string | number)[] {
  let arrCopy: (string | number)[] = [...arr];

  for (let i = 0; i < arrCopy.length; i++) {
    const randIdx: number = randomNumberGenerator(i);
    const shuffle1: (string | number) = arrCopy[i];

    arrCopy[i] = arrCopy[randIdx];
    arrCopy[randIdx] = shuffle1;
  }

  return arrCopy;
}

// TODO: Not sure how to refactor--add any to timeoutRef to rm errors
function useDebounce(fn: Function, timeout: number = 1000) {
  let timeoutRef: TimeoutRef = useRef(null);

  return (...args: any[]) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      return fn(...args);
    }, timeout);
  };
}

function createArr(n: number, fill: number | null = 0, cb = (el: number, index: number) => el)  {
  const arr: number[] = Array(n).fill(fill).map(cb);
  return arr;
}

function createMatrix(row: number, col: number, cb = () => createArr(col)) {
  const matrix: any[] = Array(row).fill(0).map(cb);

  return matrix;
}


// TODO: Not sure types going in for prevProps/newProps
function compareChanges(prevProps: any, newProps: any) {
  return (
    prevProps.active === newProps.active &&
    prevProps.properties === newProps.properties
  );
}

function resolveEffect (eff: Effect) {
  switch (eff) {
    case 'Distortion': 
      return {
        name: 'Distortion',
        method: new Tone.Distortion(...effectsList.Distortion),
      }
    
    case 'Phaser' : 
      return {
        name: 'Phaser',
        method: new Tone.Phaser(...effectsList.Phaser),
      }

    case 'Compressor' :
      return {
        name: 'Compressor',
        method: new Tone.Compressor(...effectsList.Compressor),
      }

    case 'Filter' :
      return {
        name: 'Filter',
        method: new Tone.Filter(...effectsList.Filter),
      }

    case 'Tremolo' :
      return {
        name: 'Tremolo',
        method: new Tone.Tremolo(...effectsList.Tremolo),
      }

    case 'PitchShift' :
      return {
        name: 'PitchShift',
        method: new Tone.PitchShift(...effectsList.PitchShift),
      }

    case 'Reverb' :
      return {
        name: 'Reverb',
        method: new Tone.Reverb(...effectsList.Reverb),
      }

    case 'Delay' :
      return {
        name: 'Delay',
        method: new Tone.Delay(...effectsList.Delay),
      }
      
    case 'Freeverb' :
      return {
        name: 'Freeverb',
        method: new Tone.Freeverb(...effectsList.Freeverb),
      }

    case 'FeedbackDelay' :
      return {
        name: 'FeedbackDelay',
        method: new Tone.FeedbackDelay(...effectsList.FeedbackDelay),
      }
  }
}



export {
  createArr,
  useDebounce,
  createMatrix,
  compareChanges,
  randomChordProgression,
  resolveEffect,
};
