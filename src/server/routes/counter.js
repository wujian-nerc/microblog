import Express from 'express';

function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

export function getCounter (callback) {
  setTimeout(() => {
    callback(randomInt(1, 100))
  }, 500);
}


