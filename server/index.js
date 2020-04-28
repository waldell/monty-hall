const express = require('express');
const app = express();

app.use(express.json());
app.post('/play', (req, res) => {
    const post = req.body;
    const numberOfTimes = parseInt(post.numberOfTimes);
    const changeDoor = JSON.parse(post.changeDoor);
    const results = play(numberOfTimes, changeDoor);

    res.json({
        numberOfTimes,
        changeDoor,
        results,
        wins: results.filter(x => { return x.didWinCar }).length,
        losses: results.filter(x => { return !x.didWinCar }).length
    });
    
});
app.listen(2448);


const play = (numberOfTimes, changeDoor) => {
    let results = [];
    for (let i = 0; i < numberOfTimes; i++) {
        const doorWithCar = Math.floor( Math.random() * 3 ) + 1;
        const choosenDoor = Math.floor( Math.random() * 3 ) + 1;
        const result = playOne(choosenDoor, changeDoor, doorWithCar);
        results.push(result);
    }
    return results;
}
const playOne = (choosenDoorNumber, changeDoor, doorWithCar) => {
    const doors = [1, 2, 3];

    // open a door with a goat behind it...
    const shownDoor = doors.find(door => {
        return door !== choosenDoorNumber && door !== doorWithCar;
    });
    
    let carIsBehindChoosenDoor = choosenDoorNumber === doorWithCar;
    if (changeDoor) {
        // choose a new door!
        const newDoor = doors.find(door => {
            return door !== choosenDoorNumber && door !== shownDoor;
        });
        carIsBehindChoosenDoor = newDoor === doorWithCar;
    }
    
    return {
        didWinCar: carIsBehindChoosenDoor,
        choosenDoor: choosenDoorNumber,
    }
}
