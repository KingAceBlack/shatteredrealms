/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'


let player = {
  name: 'player',
  life: 70,
  timegated: 1,
  timeremaining: '9000',
  specials: 1,
 
};


let enemy1 = {
  name: 'enemy1',
  life: 60,

 
};

let expirationTimeRem = new Date(Date.now() + 60000);

app.frame('/', (c) => {

player = { ...player, life: 70 };
enemy1 = { ...enemy1, life: 60 };

  return c.res({

    
    image : 'https://gateway.pinata.cloud/ipfs/QmWa1pMBg9xMTxT4MvSGNPqYFvX3Zw3umBE6DYmDtX1fEq',
  
    
    intents: [
     
      <Button action="/intro">Continue</Button>,
     
    ],
  }) 

});


app.frame('/intro', (c) => {


  return c.res({

    
    image : 'https://gateway.pinata.cloud/ipfs/QmSAUGfrMs5y6GFYVyDsFs4X9tKm2sw2up5NYFjLTyULJb',
  
    
    intents: [
     
      <Button action="/firstchoice">Continue</Button>,
     
    ],
  }) 

});


app.frame('/firstchoice', (c) => {


  return c.res({

    
    image : 'https://gateway.pinata.cloud/ipfs/QmPmc2gtWuyXnf1jPPK3DXfWRQfhcsEsm8sPuttkMLqjpz',
  
    
    intents: [
     
      <Button action="/leftdoor">Left</Button>,<Button action="/rightdoor">Right</Button>,
     
    ],
  }) 

});


app.frame('/leftdoor', (c) => {


  return c.res({

    
    image : 'https://gateway.pinata.cloud/ipfs/QmQj2m3dm9CHGA6U8Dx3qMxe2oGTPgxiXA3VAJfNyeNwcR',
  
    
    intents: [
     
      <Button action="/trap1ThreadCarefully">Thread Carefully</Button>,<Button action="/trap1Investigate">Investigate Hieroglyphs</Button>,
     
    ],
  }) 

});




app.frame('/trap1ThreadCarefully', (c) => {

  let image;
  let intents;


  const randomNum = Math.floor(Math.random() * 10);



  if (randomNum === 0) {
    //fail
    image = 'https://gateway.pinata.cloud/ipfs/QmNttnuh2oVzqajYc55GSfLWPgEa5SKnusQ8hrKNqH9DVG';
    intents = [<Button action="/timegate">Continue</Button>];
    
  } else {

    image = 'https://gateway.pinata.cloud/ipfs/QmXJrbQxg95t6V4MQkF4paSV2qTmArgfAgBzdykw2bXE5B';
    intents = [<Button action="/timegate">Proceed</Button>];

  }

  return c.res({
    image: image,
    intents: intents
  });

});





app.frame('/trap1Investigate', (c) => {

  let image;
  let intents;


  const randomNum = Math.floor(Math.random() * 4);



  if (randomNum === 0) {
    
    image = 'https://gateway.pinata.cloud/ipfs/QmXJrbQxg95t6V4MQkF4paSV2qTmArgfAgBzdykw2bXE5B';
    intents = [<Button action="/timegate">Proceed</Button>];
    
  } else {
    //fail
    image = 'https://gateway.pinata.cloud/ipfs/QmNttnuh2oVzqajYc55GSfLWPgEa5SKnusQ8hrKNqH9DVG';
    intents = [<Button action="/timegate">Continue</Button>];

  }

  return c.res({
    image: image,
    intents: intents
  });

});





app.frame('/timegate', (c) => {
    // Update player object to indicate that time has been gated
    const updatedPlayer = { ...player, timegated: 1 };

    // Get the current date and time
    const currentDate = new Date();

    // Calculate the time when the gate will expire (e.g., add 1 minute)
    const expirationTime = new Date(currentDate.getTime() + 600000); // 60000 milliseconds = 1 minute

        // Extract hour, minute, and second components from the expiration time
    const expirationHour = expirationTime.getHours();
    const expirationMinute = expirationTime.getMinutes();
    const expirationSecond = expirationTime.getSeconds();

    const expirationTimeString = `${expirationHour}:${expirationMinute}:${expirationSecond}`;

    expirationTimeRem = new Date(Date.now() + 69);
    expirationTimeRem.setHours(expirationTimeRem.getHours() + 2); // Add one hour
    



    player = { ...player, timeremaining: expirationTimeString };

    // Return a response with the updated player object and expiration time
    return c.res({
        image: 'https://gateway.pinata.cloud/ipfs/QmNkJ6EzaPvVu33x8rQiJR1DmBJLAPfxS9mmrHW1DCUQi8',
        intents: [
            <Button action="/checktime3">Continue</Button>,
        ],
        player: updatedPlayer,
        expirationTime: expirationTime.toISOString() // Store expiration time as a string
    });
});





// this function shows the time the player needs to return back. Say 3:30pm etc
app.frame('/checktime', (c) => {

  let image;
  let intents;

  // Calculate hours, minutes, and seconds
  let hours: number = Math.floor(player.timeremaining / 3600);
  let minutes: number = Math.floor((player.timeremaining % 3600) / 60);
  let seconds: number = player.timeremaining % 60;

  // Format the time display as HH:MM:SS
  let timeDisplay: string = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  if (player.timegated === 0) {
      //time has elapsed, continue playing
      image = 'https://gateway.pinata.cloud/ipfs/Qmc45eDkgnPmmteB8QTjBfS9Sh8KFfGLXrCxsLqMJBK4SC';
      intents = [<Button action="/timegate">Proceed</Button>];
      
    } else {
      //show remaining time
    image = (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',    // Set flex direction to column
          justifyContent: 'center',  // Vertically center the content
          alignItems: 'center',       // Horizontally center the content
          color: 'red',
          fontSize: 60,
          fontStyle: 'normal',
          letterSpacing: '-0.025em',
          padding: '0 120px',
          whiteSpace: 'pre-wrap',
          height: '100vh',            // Set height to 100% of the viewport height
          background: 'black',        // Set background color to black
        }}
      >
        {`Player should be fully rested by ${player.timeremaining}`}
      </div>
    );


      intents = [
        <Button action="/checktime">refreshframe</Button>
      ];
    }

  return c.res({
    image: image,
    intents: intents
  });

});



//this function countdowns
app.frame('/checktime2', (c) => {
    let image;
    let intents;

   

    // Calculate the remaining time by subtracting the current time from the expiration time
    const timeDifference = expirationTimeRem.getTime() - Date.now();


    // Convert the time difference to hours, minutes, and seconds
    const hoursRemaining = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const minutesRemaining = Math.floor((timeDifference / 1000 / 60) % 60);
    const secondsRemaining = Math.floor((timeDifference / 1000) % 60);

    // Format the remaining time as a string
    const expirationTimeString = `${hoursRemaining.toString().padStart(2, '0')}:${minutesRemaining.toString().padStart(2, '0')}:${secondsRemaining.toString().padStart(2, '0')}`;

    if (player.timegated === 0) {
        // Time has elapsed, continue playing
        image = 'https://gateway.pinata.cloud/ipfs/Qmc45eDkgnPmmteB8QTjBfS9Sh8KFfGLXrCxsLqMJBK4SC';
        intents = [<Button action="/timegate">Proceed</Button>];
    } else {
        // Show remaining time
        image = (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'red',
                    fontSize: 60,
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                    height: '100vh',
                    background: 'black',
                }}
            >
                {`Player should be fully rested in ${expirationTimeString}`}
            </div>
        );

        intents = [
            <Button action="/checktime2">Refresh Frame</Button>
        ];
    }

    return c.res({
        image: image,
        intents: intents
    });
});




//this function countdowns
app.frame('/checktime3', (c) => {
    let image;
    let intents;

    // Calculate the remaining time by subtracting the current time from the expiration time
    const timeDifference = expirationTimeRem.getTime() - Date.now();

    // Convert the time difference to hours, minutes, and seconds
    const hoursRemaining = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const minutesRemaining = Math.floor((timeDifference / 1000 / 60) % 60);
    const secondsRemaining = Math.floor((timeDifference / 1000) % 60);

    // Format the remaining time as a string
    const expirationTimeString = `${hoursRemaining.toString().padStart(2, '0')}:${minutesRemaining.toString().padStart(2, '0')}:${secondsRemaining.toString().padStart(2, '0')}`;

    if (player.timegated === 0) {
        // Time has elapsed, continue playing
        image = 'https://gateway.pinata.cloud/ipfs/Qmc45eDkgnPmmteB8QTjBfS9Sh8KFfGLXrCxsLqMJBK4SC';
        intents = [<Button action="/timegate">Proceed</Button>];
    } else {
        // Show remaining time
        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/Qmeh4wiW53885vpLds3znH6W5sXs8c6E9KEDbGJBmrKRC8)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    height: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    color: '#E1A411',
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.4,
                    marginTop: 0,
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                }}
            >
                <p style={{ fontSize : '50px', margin : '0', marginTop : '-500', color: 'red'  }}> {`Player should be fully rested in ${expirationTimeString}`} </p>
              
            </div>
        );

        intents = [
            <Button action="/checktime3">Refresh Frame</Button>
        ];
    }

    return c.res({
        image: image,
        intents: intents
    });
});





app.frame('/rightdoor', (c) => {


  return c.res({

    
    image : 'https://gateway.pinata.cloud/ipfs/QmSp1A3tsNWkrpQQwMa1CG6foYorCwA5pUCHDttfeh1iUM',
  
    
    intents: [
     
      <Button action="/flee">Run !</Button>,<Button action="/fight">Fight !</Button>,
     
    ],
  }) 

});



app.frame('/flee', (c) => {


  return c.res({

    
    image : 'https://gateway.pinata.cloud/ipfs/QmUmKt182riVcNJsCb72Ah8uq7MJp3Sbeand8BdQwK2fEN',
  
    
    intents: [
     
      <Button action="/firstchoice">Continue</Button>,
     
    ],
  }) 

});






app.frame('/fight', (c) => {
    let image;
    let intents;


   


    if (player.specials === 0) {
      
        image = 'https://gateway.pinata.cloud/ipfs/QmYxN6UJJER3U24RrEUQuKCpyWP4c3uo2ikEN3zCHErBM3';
        intents = [<Button action="/SwiftAttack">Swift Attack</Button>,<Button action="/HeavyAttack">Power Attack</Button>];
    } else {
 
        image = 'https://gateway.pinata.cloud/ipfs/QmYxN6UJJER3U24RrEUQuKCpyWP4c3uo2ikEN3zCHErBM3';
        intents = [<Button action="/SwiftAttack">Swift Attack</Button>,<Button action="/HeavyAttack">Power Attack</Button>,<Button action="/specialAttack">Special Attack</Button>];

    }

    return c.res({
        image: image,
        intents: intents
    });
});



app.frame('/SwiftAttack', (c) => {
    let image;
    let intents;
    //player.specials -=1
   
    const swiftRandomNum = Math.floor(Math.random() * 8);


    if (swiftRandomNum < 3) {
        // glancing blow
        enemy1.life -= 7

        if (enemy1.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmSLsUjxkrjqSsqNKrmPaaiEu4qygSR8MtrehgLHcdbfbc';
          intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/timegate">Continue</Button>];


        }
        


    } else if (swiftRandomNum === 3) {
      // attack missed
      image = 'https://gateway.pinata.cloud/ipfs/QmbZ964voi8yRCcyzaBWgVqxKYNrYUbzLCyoPPSWzaw2J7';
      intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];



    } else if (swiftRandomNum === 4) {
      //critical hit
      enemy1.life -= 28

      if (enemy1.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmQpk4VqwCCgoMN9P5RSW2jaLDtyTrR7C2q3gE5p5vNMNj';
          intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/timegate">Continue</Button>];


        }
      

    } else {
        // normal attack
        enemy1.life -= 14

        if (enemy1.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmViDE4Th6MB5REsZA144cKgJWmhAMfkAehh89UHEiVVog';
          intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/timegate">Continue</Button>];


        }

        
    }

    return c.res({
        image: image,
        intents: intents
    });
});




app.frame('/HeavyAttack', (c) => {
    let image;
    let intents;

   
    const heavyRandomNum = Math.floor(Math.random() * 10);


    if (heavyRandomNum < 4) {
        // glancing blow
        enemy1.life -= 10

        if (enemy1.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmSLsUjxkrjqSsqNKrmPaaiEu4qygSR8MtrehgLHcdbfbc';
          intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/timegate">Continue</Button>];


        }
        


    } else if (heavyRandomNum === 4) {
      // attack missed
      image = 'https://gateway.pinata.cloud/ipfs/QmbZ964voi8yRCcyzaBWgVqxKYNrYUbzLCyoPPSWzaw2J7';
      intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

    } else if (heavyRandomNum === 5) {
        // attack missed
        image = 'https://gateway.pinata.cloud/ipfs/QmbZ964voi8yRCcyzaBWgVqxKYNrYUbzLCyoPPSWzaw2J7';
        intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];


    } else if (heavyRandomNum === 6) {
      //critical hit
      enemy1.life -= 40

      if (enemy1.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmQpk4VqwCCgoMN9P5RSW2jaLDtyTrR7C2q3gE5p5vNMNj';
          intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/timegate">Continue</Button>];


        }      

    } else {
        // normal attack
        enemy1.life -= 20

        if (enemy1.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmQh9GBmb654DzCciGBDCN2L5doaMJxs7npuWJMkHZt8Zp';
          intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/timegate">Continue</Button>];


        }

        
    }

    return c.res({
        image: image,
        intents: intents
    });
});


app.frame('/specialAttack', (c) => {
    let image;
    let intents;
    player.specials -=1
   
    const specialRandomNum = Math.floor(Math.random() * 8);


    if (specialRandomNum < 3) {
        //unsuccessful special attack 

        image = 'https://gateway.pinata.cloud/ipfs/QmV4Mvd7Vx8mHrYsxJkuhYNxohC5x9ZPo2Bib5Dx5AokEQ';
        intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];
              

    } else {
        // normal attack
        enemy1.life -= 25

        if (enemy1.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmWzb6y1NoNRts5H776dshNVkrmFJcYVtvaxAQ7U7A7jsB';
          intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/timegate">Continue</Button>];


        }

        
    }

    return c.res({
        image: image,
        intents: intents
    });
});






app.frame('/dodgeResult', (c) => {
    let image;
    let intents;

   
    const dodgeRandomNum = Math.floor(Math.random() * 10);


    if (dodgeRandomNum < 4) {
        // player dodged
        image = 'https://gateway.pinata.cloud/ipfs/QmWfFCDtRMe6wPv9K7gkDtHSNt9GpAvkw247pxPoeJELvt';
        intents = [<Button action="/fight">Continue</Button>];

    } else {
        // player is hit
        player.life -= 15
        if (player.life > 0) {
          //player is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmRnjewER2GNLSwyrZcqDrd4AzMSkhRddJBDCeAnZS6mac';
          intents = [<Button action="/fight">Continue</Button>];

        } else {
          // player is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmQXehPigXANi1MQHTXVsWi5PL4oBA9mC2jtmA6sk2WPQM';
          intents = [<Button action="/fleedeath">Continue</Button>];


        }
    }

    return c.res({
        image: image,
        intents: intents
    });
});


app.frame('/counterResult', (c) => {
    let image;
    let intents;

   
    const dodgeRandomNum = Math.floor(Math.random() * 10);


    if (dodgeRandomNum < 3) {
        // succesful counter
        enemy1.life -= 10

        if (enemy1.life > 0) {
          //show counter frame

          image = 'https://gateway.pinata.cloud/ipfs/QmPKbeqxXhFTWA6YFfSetPYjRzqEtTbSFL7rnqw5qUjnpp';
          intents = [<Button action="/fight">Continue</Button>];

        } else {
          // enemy is dead
          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/timegate">Continue</Button>];

        }
        

    } else {
        // player is hit
        player.life -= 15
        if (player.life > 0) {
          //player is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmRnjewER2GNLSwyrZcqDrd4AzMSkhRddJBDCeAnZS6mac';
          intents = [<Button action="/fight">Continue</Button>];

        } else {
          // player is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmQXehPigXANi1MQHTXVsWi5PL4oBA9mC2jtmA6sk2WPQM';
          intents = [<Button action="/fleedeath">Continue</Button>];


        }
    }

    return c.res({
        image: image,
        intents: intents
    });
});


app.frame('/fleedeath', (c) => {


  return c.res({

    
    image : 'https://gateway.pinata.cloud/ipfs/QmXLyWwoj4ubmoaMkUnfJPi7h8EyFKTFBxuNXbPY3mkXf1',
  
    
    intents: [
     
      <Button action="/timegate">Continue</Button>,
     
    ],
  }) 

});







/*app.frame('/fight', (c) => {


  return c.res({

    
    image : 'https://gateway.pinata.cloud/ipfs/QmYxN6UJJER3U24RrEUQuKCpyWP4c3uo2ikEN3zCHErBM3',
  
    
    intents: [
     
      <Button action="/SwiftAttack">Swift Attack</Button>,<Button action="/HeavyAttack">Power Attack</Button>,<Button action="/HeavyAttack">Special Attack</Button>,
     
    ],
  }) 

});*/





devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
