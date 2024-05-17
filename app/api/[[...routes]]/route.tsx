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
  timeremaining: "9000",
  specials: 1,
  tinkererbombactive: 0,
 
};


let enemy1 = {
  name: '/intro',
  life: 60,

 
};

let progressMarker = {
  previousFrame: '/intro',
  backButton:1,
  inventorySlot1: 1,
  inventorySlot2: 1,
  inventorySlot3: 1,
  
 
};

let expirationTimeRem = new Date(Date.now() + 60000);

app.frame('/', (c) => {
    player = { ...player, life: 70 };
    enemy1 = { ...enemy1, life: 60 };

    return c.res({
        image: 'https://gateway.pinata.cloud/ipfs/QmWa1pMBg9xMTxT4MvSGNPqYFvX3Zw3umBE6DYmDtX1fEq',
        intents: [
            //<Button action={enemy1.name}>Continue</Button>, // example of how to pass a variable to the button
            <Button action="/intro">Continue</Button>,
        ],
    });
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

  progressMarker = { ...progressMarker, previousFrame: '/firstchoice' };
  return c.res({

    
    image : 'https://gateway.pinata.cloud/ipfs/QmPmc2gtWuyXnf1jPPK3DXfWRQfhcsEsm8sPuttkMLqjpz',
  
    
    intents: [
     
      <Button action="/leftdoor">Left</Button>,<Button action="/rightdoor">Right</Button>,<Button action="/showPlayerStatus">Inventory</Button>,
     
    ],
  }) 

});




app.frame('/showPlayerStatus', (c) => {
    let image: string;
    let intents: JSX.Element[] = [];

    // Check the different combinations of inventory slots
    if (progressMarker.inventorySlot1 === 1 && progressMarker.inventorySlot2 === 1 && progressMarker.inventorySlot3 === 1) {
        image = 'https://gateway.pinata.cloud/ipfs/QmfNerwFzgrmxy6VijLGamzpdKubNaK42npPUaNxHSZurW';
    } else if (progressMarker.inventorySlot1 === 1 && progressMarker.inventorySlot2 === 0 && progressMarker.inventorySlot3 === 1) {
        image = 'https://gateway.pinata.cloud/ipfs/QmfSd5kndQoHDqGnzSocHAen1jbWy2d6W1M9PoFCFpVWsM';
    } else if (progressMarker.inventorySlot1 === 0 && progressMarker.inventorySlot2 === 1 && progressMarker.inventorySlot3 === 1) {
        image = 'https://gateway.pinata.cloud/ipfs/QmZn57vyWprfyEK9nbkbgAWUmsYyFT3JeTMsGG2RoRfP6Q';
    } else if (progressMarker.inventorySlot1 === 1 && progressMarker.inventorySlot2 === 1 && progressMarker.inventorySlot3 === 0) {
        image = 'https://gateway.pinata.cloud/ipfs/QmViozrZ1YHyNfMpPGCJQ5dus2wXrA8oxwJiFyYMGsdvTn';
    } else if (progressMarker.inventorySlot1 === 1 && progressMarker.inventorySlot2 === 0 && progressMarker.inventorySlot3 === 0) {
        image = 'https://gateway.pinata.cloud/ipfs/QmXMyuj3Nc6RYEbaHHwDtmFNmFCw4Rid6tunBGxjzyp9mx';
    } else if (progressMarker.inventorySlot1 === 0 && progressMarker.inventorySlot2 === 1 && progressMarker.inventorySlot3 === 0) {
        image = 'https://gateway.pinata.cloud/ipfs/QmWWiJuyKX2q7QopT3Ug8NtgRQdkvKZT3MvsrFPkmtuJM4';
    } else if (progressMarker.inventorySlot1 === 0 && progressMarker.inventorySlot2 === 0 && progressMarker.inventorySlot3 === 1) {
        image = 'https://gateway.pinata.cloud/ipfs/QmQEqpEiKjakiro1xudf6FwDxoWsf1z7SmiMeU25G36AuX';
    } else {
        // Default case where all inventory slots are 0 or any unexpected combination
        image = 'https://gateway.pinata.cloud/ipfs/QmatyUPpccdoYX9eELzF1ApFPNpkHoH4Dp8NAdCT7rfdjQ';
    }

    // Add buttons based on inventory slots
    if (progressMarker.inventorySlot1 === 1) {
        intents.push(<Button action="/mysticpotionused">Mystic Potion</Button>);
    }
    if (progressMarker.inventorySlot2 === 1) {
        intents.push(<Button action="/medickitused">Medic Kit</Button>);
    }
    if (progressMarker.inventorySlot3 === 1) {
        intents.push(<Button action="/tinkererbombused">Tinkerers Bomb</Button>);
    }
    if (progressMarker.backButton === 1) {
        intents.push(<Button action={progressMarker.previousFrame}>Close</Button>);
    }

    return c.res({
        image: (
            <div
                style={{
                    position: 'relative',  // Set the container to relative positioning
                    height: '100vh',
                    background: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <img
                    src={image}
                    alt="Status Image"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',  // Ensure the image covers the entire container
                    }}
                />
                <p style={{ fontSize: '38px', margin: '0', marginTop: '-514px', color: 'green', textAlign: 'right', marginRight: '-892px', fontWeight: 'bold' }}>
                    {player.life}
                </p>
            </div>
        ),
        intents: intents
    });
});




/*app.frame('/depreciated--showPlayerStatus', (c) => {
    let image;
    let intents = [];

        // Define the images and texts
    const firstImgSrc = "https://gateway.pinata.cloud/ipfs/QmatyUPpccdoYX9eELzF1ApFPNpkHoH4Dp8NAdCT7rfdjQ";
    const secondImgSrc = "https://gateway.pinata.cloud/ipfs/QmRLHgSbDzgVFVv5TKMmzhPF9cMDHnQu95wuD4wioLcXo5";
    const thirdImgSrc = "https://gateway.pinata.cloud/ipfs/QmP8bJAwTzzFMwMdCNBR9e4e6ztUrKeSmS7UTbo86fxpUv";
    const fourthImgSrc = "https://gateway.pinata.cloud/ipfs/QmcHLDoxYfmQ9vsJZn6PDpdQmVFspQvo5aS9uQH7bTowzh";
    const firstTextSrc = "https://gateway.pinata.cloud/ipfs/QmQKtH1iSpBsHTJ5KVMjAWdcpkzDiNvDpdN8J3eJDzkrtG";
    const secondTextSrc = "https://gateway.pinata.cloud/ipfs/QmQX4NC5cLm2sMnQ6QNpHb9HGadhcQ85vPtTy8wV2yk24a";
    const thirdTextSrc = "https://gateway.pinata.cloud/ipfs/QmW56Jf449vAbmYXxoh1BisUyktfF3k38sYUkHrfaSt4bE";
    

    // Function to create the image div with specific styles
    const createImageDiv = (firstImgSrc, secondImgSrc, thirdImgSrc, fourthImgSrc, firstTextSrc, secondTextSrc, thirdTextSrc) => (
        <div
            style={{
                position: 'relative',  // Set the container to relative positioning
                height: '100vh',
                background: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <img
                src={firstImgSrc}
                alt="First Image"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',  // Ensure the image covers the entire container
                }}
            />
            {secondImgSrc && <img
                src={secondImgSrc}
                alt="Second Image"
                style={{
                    position: 'absolute',  // Set the second image to absolute positioning
                    width: '100px',
                    height: '98px',
                    top: '32%',  // Adjust the position to place it correctly
                    left: '8%',
                    transform: 'translate(-50%, -50%)',  // Center the image exactly
                }}
            />}
            {thirdImgSrc && <img
                src={thirdImgSrc}
                alt="Third Image"
                style={{
                    position: 'absolute',  // Set the third image to absolute positioning
                    width: '100px',
                    height: '98px',
                    top: '60%',  // Position it relative to the second image
                    left: '8%',
                    transform: 'translate(-50%, -50%)',  // Center the image exactly
                }}
            />}
            {fourthImgSrc && <img
                src={fourthImgSrc}
                alt="Fourth Image"
                style={{
                    position: 'absolute',  // Set the fourth image to absolute positioning
                    width: '100px',
                    height: '98px',
                    top: '86%',  // Position it relative to the second image
                    left: '8%',
                    transform: 'translate(-50%, -50%)',  // Center the image exactly
                }}
            />}
            {firstTextSrc && <img
                src={firstTextSrc}
                alt="First Text"
                style={{
                    position: 'absolute',  // Set the first text to absolute positioning
                    width: '250px',
                    height: '86px',
                    top: '32%',  // Position it relative to the second image
                    left: '25%',
                    transform: 'translate(-50%, -50%)',  // Center the image exactly
                }}
            />}
            {secondTextSrc && <img
                src={secondTextSrc}
                alt="Second Text"
                style={{
                    position: 'absolute',  // Set the second text to absolute positioning
                    width: '250px',
                    height: '86px',
                    top: '60%',  // Position it relative to the second image
                    left: '25%',
                    transform: 'translate(-50%, -50%)',  // Center the image exactly
                }}
            />}
            {thirdTextSrc && <img
                src={thirdTextSrc}
                alt="Third Text"
                style={{
                    position: 'absolute',  // Set the third text to absolute positioning
                    width: '250px',
                    height: '86px',
                    top: '86%',  // Position it relative to the second image
                    left: '25%',
                    transform: 'translate(-50%, -50%)',  // Center the image exactly
                }}
            />}
            <p style={{ fontSize: '38px', margin: '0', marginTop: '-514px', color: 'green', textAlign: 'right', marginRight: '-892px', fontWeight: 'bold' }}>
                {player.life}
            </p>


        </div>
    );


    // Check the different combinations of inventory slots
    if (progressMarker.inventorySlot1 === 1 && progressMarker.inventorySlot2 === 1 && progressMarker.inventorySlot3 === 1) {
        image = createImageDiv(
            "https://gateway.pinata.cloud/ipfs/QmatyUPpccdoYX9eELzF1ApFPNpkHoH4Dp8NAdCT7rfdjQ",
            "https://gateway.pinata.cloud/ipfs/QmRLHgSbDzgVFVv5TKMmzhPF9cMDHnQu95wuD4wioLcXo5",
            "https://gateway.pinata.cloud/ipfs/QmP8bJAwTzzFMwMdCNBR9e4e6ztUrKeSmS7UTbo86fxpUv",
            "https://gateway.pinata.cloud/ipfs/QmcHLDoxYfmQ9vsJZn6PDpdQmVFspQvo5aS9uQH7bTowzh",
            "https://gateway.pinata.cloud/ipfs/QmQKtH1iSpBsHTJ5KVMjAWdcpkzDiNvDpdN8J3eJDzkrtG",
            "https://gateway.pinata.cloud/ipfs/QmQX4NC5cLm2sMnQ6QNpHb9HGadhcQ85vPtTy8wV2yk24a",
            "https://gateway.pinata.cloud/ipfs/QmW56Jf449vAbmYXxoh1BisUyktfF3k38sYUkHrfaSt4bE"
        );
    } else if (progressMarker.inventorySlot1 === 1 && progressMarker.inventorySlot2 === 0 && progressMarker.inventorySlot3 === 1) {
        image = createImageDiv(
            "https://gateway.pinata.cloud/ipfs/QmatyUPpccdoYX9eELzF1ApFPNpkHoH4Dp8NAdCT7rfdjQ",
            "https://gateway.pinata.cloud/ipfs/QmRLHgSbDzgVFVv5TKMmzhPF9cMDHnQu95wuD4wioLcXo5",
            "",
            "https://gateway.pinata.cloud/ipfs/QmcHLDoxYfmQ9vsJZn6PDpdQmVFspQvo5aS9uQH7bTowzh",
            "https://gateway.pinata.cloud/ipfs/QmQKtH1iSpBsHTJ5KVMjAWdcpkzDiNvDpdN8J3eJDzkrtG",
            "",
            "https://gateway.pinata.cloud/ipfs/QmW56Jf449vAbmYXxoh1BisUyktfF3k38sYUkHrfaSt4bE"
        );
    } else if (progressMarker.inventorySlot1 === 0 && progressMarker.inventorySlot2 === 1 && progressMarker.inventorySlot3 === 1) {
        image = createImageDiv(
            "https://gateway.pinata.cloud/ipfs/QmatyUPpccdoYX9eELzF1ApFPNpkHoH4Dp8NAdCT7rfdjQ",
            "",
            "https://gateway.pinata.cloud/ipfs/QmP8bJAwTzzFMwMdCNBR9e4e6ztUrKeSmS7UTbo86fxpUv",
            "https://gateway.pinata.cloud/ipfs/QmcHLDoxYfmQ9vsJZn6PDpdQmVFspQvo5aS9uQH7bTowzh",
            "",
            "https://gateway.pinata.cloud/ipfs/QmQX4NC5cLm2sMnQ6QNpHb9HGadhcQ85vPtTy8wV2yk24a",
            "https://gateway.pinata.cloud/ipfs/QmW56Jf449vAbmYXxoh1BisUyktfF3k38sYUkHrfaSt4bE"
        );
    } else if (progressMarker.inventorySlot1 === 1 && progressMarker.inventorySlot2 === 1 && progressMarker.inventorySlot3 === 0) {
        image = createImageDiv(
            "https://gateway.pinata.cloud/ipfs/QmatyUPpccdoYX9eELzF1ApFPNpkHoH4Dp8NAdCT7rfdjQ",
            "https://gateway.pinata.cloud/ipfs/QmRLHgSbDzgVFVv5TKMmzhPF9cMDHnQu95wuD4wioLcXo5",
            "https://gateway.pinata.cloud/ipfs/QmP8bJAwTzzFMwMdCNBR9e4e6ztUrKeSmS7UTbo86fxpUv",
            "",
            "https://gateway.pinata.cloud/ipfs/QmQKtH1iSpBsHTJ5KVMjAWdcpkzDiNvDpdN8J3eJDzkrtG",
            "https://gateway.pinata.cloud/ipfs/QmQX4NC5cLm2sMnQ6QNpHb9HGadhcQ85vPtTy8wV2yk24a",
            ""
        );
    } else if (progressMarker.inventorySlot1 === 1 && progressMarker.inventorySlot2 === 0 && progressMarker.inventorySlot3 === 0) {
        image = createImageDiv(
            "https://gateway.pinata.cloud/ipfs/QmatyUPpccdoYX9eELzF1ApFPNpkHoH4Dp8NAdCT7rfdjQ",
            "https://gateway.pinata.cloud/ipfs/QmRLHgSbDzgVFVv5TKMmzhPF9cMDHnQu95wuD4wioLcXo5",
            "",
            "",
            "https://gateway.pinata.cloud/ipfs/QmQKtH1iSpBsHTJ5KVMjAWdcpkzDiNvDpdN8J3eJDzkrtG",
            "",
            ""
        );
    } else if (progressMarker.inventorySlot1 === 0 && progressMarker.inventorySlot2 === 1 && progressMarker.inventorySlot3 === 0) {
        image = createImageDiv(
            "https://gateway.pinata.cloud/ipfs/QmatyUPpccdoYX9eELzF1ApFPNpkHoH4Dp8NAdCT7rfdjQ",
            "",
            "https://gateway.pinata.cloud/ipfs/QmP8bJAwTzzFMwMdCNBR9e4e6ztUrKeSmS7UTbo86fxpUv",
            "",
            "",
            "https://gateway.pinata.cloud/ipfs/QmQX4NC5cLm2sMnQ6QNpHb9HGadhcQ85vPtTy8wV2yk24a",
            ""
        );
    } else if (progressMarker.inventorySlot1 === 0 && progressMarker.inventorySlot2 === 0 && progressMarker.inventorySlot3 === 1) {
        image = createImageDiv(
            "https://gateway.pinata.cloud/ipfs/QmatyUPpccdoYX9eELzF1ApFPNpkHoH4Dp8NAdCT7rfdjQ",
            "",
            "",
            "https://gateway.pinata.cloud/ipfs/QmcHLDoxYfmQ9vsJZn6PDpdQmVFspQvo5aS9uQH7bTowzh",
            "",
            "",
            "https://gateway.pinata.cloud/ipfs/QmW56Jf449vAbmYXxoh1BisUyktfF3k38sYUkHrfaSt4bE"
        );
    } else {
        // Default case where all inventory slots are 0 or any unexpected combination
        image = createImageDiv(
            "https://gateway.pinata.cloud/ipfs/QmatyUPpccdoYX9eELzF1ApFPNpkHoH4Dp8NAdCT7rfdjQ",
            "",
            "",
            "",
            "",
            "",
            ""
        );
    }

    if (progressMarker.inventorySlot1 === 1) {
        intents.push(<Button action="/mysticpotionused">Mystic Potion</Button>);
    }
    if (progressMarker.inventorySlot2 === 1) {
        intents.push(<Button action="/medickitused">Medic Kit</Button>);
    }
    if (progressMarker.inventorySlot3 === 1) {
        intents.push(<Button action="/tinkererbombused">Tinkerers Bomb</Button>);
    }
    if (progressMarker.backButton === 1) {
        intents.push(<Button action={progressMarker.previousFrame}>Close</Button>);
    }

    return c.res({
        image: image,
        intents: intents
    });
});*/




app.frame('/mysticpotionused', (c) => {
   progressMarker = { ...progressMarker, inventorySlot1: 0 };
   
   player = { ...player, specials: player.specials += 1 };

  return c.res({

    
    image : 'https://gateway.pinata.cloud/ipfs/QmUijRizW5XioKjDgAFaGs9sJemYnkkgCoqVXSgtdNyQ8c',
  
    
    intents: [
     
      <Button action="/showPlayerStatus">Continue</Button>,
     
    ],
  }) 

});


app.frame('/medickitused', (c) => {
   progressMarker = { ...progressMarker, inventorySlot2: 0 };
   player.life += 50;

   if (player.life > 100) {
      player = { ...player, life: 100 };
    }


  return c.res({

    
    image : 'https://gateway.pinata.cloud/ipfs/QmUijRizW5XioKjDgAFaGs9sJemYnkkgCoqVXSgtdNyQ8c',
  
    
    intents: [
     
      <Button action="/showPlayerStatus">Continue</Button>,
     
    ],
  }) 

});



app.frame('/tinkererbombused', (c) => {
   progressMarker = { ...progressMarker, inventorySlot3: 0 };
   player.tinkererbombactive += 1;

  return c.res({

    
    image : 'https://gateway.pinata.cloud/ipfs/QmUijRizW5XioKjDgAFaGs9sJemYnkkgCoqVXSgtdNyQ8c',
  
    
    intents: [
     
      <Button action="/showPlayerStatus">Continue</Button>,
     
    ],
  }) 

});














/*app.frame('/showPlayerStatus', (c) => {
    let image;
    let intents;

    if (progressMarker.inventorySlot1 === 1 && progressMarker.inventorySlot2 === 1 && progressMarker.inventorySlot3 === 1) {

        image = (
            <div
                style={{
                    position: 'relative',  // Set the container to relative positioning
                    height: '100vh',
                    background: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <img
                    src="https://gateway.pinata.cloud/ipfs/QmatyUPpccdoYX9eELzF1ApFPNpkHoH4Dp8NAdCT7rfdjQ"
                    alt="First Image"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',  // Ensure the image covers the entire container
                    }}
                />
                <img
                    src="https://gateway.pinata.cloud/ipfs/QmRLHgSbDzgVFVv5TKMmzhPF9cMDHnQu95wuD4wioLcXo5"
                    alt="Second Image"
                    style={{
                        position: 'absolute',  // Set the second image to absolute positioning
                        width: '100px',
                        height: '98px',
                        top: '36%',  // Adjust the position to place it correctly
                        left: '10%', // Adjust the position to place it correctly
                        transform: 'translate(-50%, -50%)',  // Center the image exactly
                    }}
                />
                <img
                    src="https://gateway.pinata.cloud/ipfs/QmP8bJAwTzzFMwMdCNBR9e4e6ztUrKeSmS7UTbo86fxpUv"
                    alt="Third Image"
                    style={{
                        position: 'absolute',  // Set the third image to absolute positioning
                        width: '100px',
                        height: '98px',
                        top: '60%',  // Position it relative to the second image
                        left: '10%', // Align it horizontally with the second image
                        transform: 'translate(-50%, -50%)',  // Center the image exactly
                    }}
                />
                <img
                    src="https://gateway.pinata.cloud/ipfs/QmcHLDoxYfmQ9vsJZn6PDpdQmVFspQvo5aS9uQH7bTowzh"
                    alt="Fourth Image"
                    style={{
                        position: 'absolute',  // Set the fourth image to absolute positioning
                        width: '100px',
                        height: '98px',
                        top: '84%',  // Position it relative to the second image
                        left: '10%', // Align it horizontally with the second image
                        transform: 'translate(-50%, -50%)',  // Center the image exactly
                    }}
                />
                <img
                    src="https://gateway.pinata.cloud/ipfs/QmQKtH1iSpBsHTJ5KVMjAWdcpkzDiNvDpdN8J3eJDzkrtG"
                    alt="First Text"
                    style={{
                        position: 'absolute',  // Set the first text to absolute positioning
                        width: '400px',
                        height: '80px',
                        top: '36%',  // Position it relative to the second image
                        left: '35%', // Align it horizontally with the second image
                        transform: 'translate(-50%, -50%)',  // Center the image exactly
                    }}
                />
                <img
                    src="https://gateway.pinata.cloud/ipfs/QmQX4NC5cLm2sMnQ6QNpHb9HGadhcQ85vPtTy8wV2yk24a"
                    alt="Second Text"
                    style={{
                        position: 'absolute',  // Set the second text to absolute positioning
                        width: '400px',
                        height: '80px',
                        top: '60%',  // Position it relative to the second image
                        left: '35%', // Align it horizontally with the second image
                        transform: 'translate(-50%, -50%)',  // Center the image exactly
                    }}
                />
                <img
                    src="https://gateway.pinata.cloud/ipfs/QmW56Jf449vAbmYXxoh1BisUyktfF3k38sYUkHrfaSt4bE"
                    alt="Third Text"
                    style={{
                        position: 'absolute',  // Set the third text to absolute positioning
                        width: '400px',
                        height: '80px',
                        top: '84%',  // Position it relative to the second image
                        left: '35%', // Align it horizontally with the second image
                        transform: 'translate(-50%, -50%)',  // Center the image exactly
                    }}
                />
            </div>
        );

        intents = [
            <Button action="/showPlayerStatus">Mystic Potion</Button>,
            <Button action="/showPlayerStatus">Medic Kit</Button>,
            <Button action="/showPlayerStatus">Tinkerers Bomb</Button>
        ];

    } else {
        image = null;
        intents = [];
    }

    return c.res({
        image: image,
        intents: intents
    });
});*/





app.frame('/leftdoor', (c) => {

  progressMarker = { ...progressMarker, previousFrame: '/leftdoor' };
  return c.res({

    
    image : 'https://gateway.pinata.cloud/ipfs/QmQj2m3dm9CHGA6U8Dx3qMxe2oGTPgxiXA3VAJfNyeNwcR',
  
    
    intents: [
     
      <Button action="/trap1ThreadCarefully">Thread Carefully</Button>,<Button action="/trap1Investigate">Investigate Hieroglyphs</Button>,
      <Button action="/showPlayerStatus">Inventory</Button>,
     
    ],
  }) 

});




app.frame('/example', (c) => {
    let image;
    let intents;

    image = (
        <div
            style={{
                position: 'relative',  // Set the container to relative positioning
                height: '100vh',
                background: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <img
                src="https://gateway.pinata.cloud/ipfs/QmWa1pMBg9xMTxT4MvSGNPqYFvX3Zw3umBE6DYmDtX1fEq"
                alt="First Image"
                style={{
                    width: '1200px',
                    height: '620px',
                }}
            />
            <img
                src="https://gateway.pinata.cloud/ipfs/Qmc45eDkgnPmmteB8QTjBfS9Sh8KFfGLXrCxsLqMJBK4SC"
                alt="Second Image"
                style={{
                    position: 'absolute',
                    width: '150px',
                    height: '150px',
                    top: '50%',  // Center it vertically
                    left: '50%', // Center it horizontally
                    transform: 'translate(-50%, -50%)',  // Center the image exactly on top of the first image
                }}
            />
            <img
                src="https://gateway.pinata.cloud/ipfs/Qmc45eDkgnPmmteB8QTjBfS9Sh8KFfGLXrCxsLqMJBK4SC"
                alt="Third Image"
                style={{
                    position: 'absolute',
                    width: '150px',
                    height: '150px',
                    top: '75%',  // Position it differently within the container
                    left: '75%',
                    transform: 'translate(-50%, -50%)',
                }}
            />
        </div>
    );

    intents = [
        <Button action="/">Continue</Button>
    ];

    return c.res({
        image: image,
        intents: intents
    });
});




app.frame('/trap1ThreadCarefully', (c) => {

  let image;
  let intents;
  let randomNum;

  if (player.tinkererbombactive > 0) {
      randomNum = 2;  // Assign value without redeclaring
      player.tinkererbombactive -= 1;
  } else {
      randomNum = Math.floor(Math.random() * 10);  // Assign value without redeclaring
  }
    



  if (randomNum === 0) {
    //fail
    image = 'https://gateway.pinata.cloud/ipfs/QmNttnuh2oVzqajYc55GSfLWPgEa5SKnusQ8hrKNqH9DVG';
    intents = [<Button action="/timegate">Continue</Button>];
    
  } else {
    //victory
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

  
  let randomNum;

  if (player.tinkererbombactive > 0) {
      randomNum = 0;  // Assign value without redeclaring
      player.tinkererbombactive -= 1;
  } else {
      randomNum = Math.floor(Math.random() * 4);  // Assign value without redeclaring
  }


  if (randomNum === 0) {
    // success
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

  progressMarker = { ...progressMarker, previousFrame: '/rightdoor' };
  return c.res({

    
    image : 'https://gateway.pinata.cloud/ipfs/QmSp1A3tsNWkrpQQwMa1CG6foYorCwA5pUCHDttfeh1iUM',
  
    
    intents: [
     
      <Button action="/flee">Run !</Button>,<Button action="/fight">Fight !</Button>,<Button action="/showPlayerStatus">Inventory</Button>,
     
    ],
  }) 

});



app.frame('/flee', (c) => {

  progressMarker = { ...progressMarker, previousFrame: '/flee' };
  return c.res({

    
    image : 'https://gateway.pinata.cloud/ipfs/QmUmKt182riVcNJsCb72Ah8uq7MJp3Sbeand8BdQwK2fEN',
  
    
    intents: [
     
      <Button action="/firstchoice">Continue</Button>,<Button action="/showPlayerStatus">Inventory</Button>,
     
    ],
  }) 

});






app.frame('/fight', (c) => {
    let image;
    let intents;


   progressMarker = { ...progressMarker, previousFrame: '/fight' };


    if (player.specials === 0) {
      
        image = 'https://gateway.pinata.cloud/ipfs/QmYxN6UJJER3U24RrEUQuKCpyWP4c3uo2ikEN3zCHErBM3';
        intents = [<Button action="/SwiftAttack">Swift Attack</Button>,<Button action="/HeavyAttack">Power Attack</Button>,<Button action="/showPlayerStatus">Inventory</Button>];
    } else {
 
        image = 'https://gateway.pinata.cloud/ipfs/QmYxN6UJJER3U24RrEUQuKCpyWP4c3uo2ikEN3zCHErBM3';
        intents = [<Button action="/SwiftAttack">Swift Attack</Button>,<Button action="/HeavyAttack">Power Attack</Button>,<Button action="/specialAttack">Special Attack</Button>,<Button action="/showPlayerStatus">Inventory</Button>];

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
    progressMarker = { ...progressMarker, previousFrame: '/SwiftAttack' };
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

    progressMarker = { ...progressMarker, previousFrame: '/HeavyAttack' };
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
    progressMarker = { ...progressMarker, previousFrame: '/specialAttack' };

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

    progressMarker = { ...progressMarker, previousFrame: '/dodgeResult' };
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
        progressMarker = { ...progressMarker, previousFrame: '/counterResult' };
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
