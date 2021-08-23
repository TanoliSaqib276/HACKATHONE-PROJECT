let inptEmail = document.getElementById('email');
let userOrRes = document.getElementById('name01')
let inptPswrd = document.getElementById('pswrd');
let inptPhNum = document.getElementById('phNum');
let inptSltCnt = document.getElementById('sltCnt');
let userSltDropDown = document.getElementById('sltDropDown');
let db = firebase.firestore();



function registerAsRestraunt() {
  //Sign up new users

  firebase.auth().createUserWithEmailAndPassword(inptEmail.value, inptPswrd.value)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      // ...
      console.log(user);
      //firestore

      let restToSave = {
        UID: user.uid,
        RestName: userOrRes.value,
        phNum: inptPhNum.value,
        country: inptSltCnt.value,
        city: slctdDpDown()

      }
      db.collection('RESTRAUNT').doc(restToSave.UID).set(restToSave)
        .then((RestrauntData) => {
          console.log(RestrauntData, 'done');
          window.location = './Restraunts.html';
        }
        )


      // saveRst(restToSave);




      // db.collection("Restraunt").add({
      //     Rst: userOrRes.value,
      //     UID : user.uid,
      //     phNum: inptPhNum.value,
      //     country: inptSltCnt.value,
      //     city : slctdDpDown()
      // })
      // .then((docRef) => {
      //     console.log("Document written with ID: ", docRef.id);
      // })
      // .catch((error) => {
      //     console.error("Error adding document: ", error);
      // });


    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
      console.log(error)
    });
}
function registerAsUser() {

  //Sign up new users

  firebase.auth().createUserWithEmailAndPassword(inptEmail.value, inptPswrd.value)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      // ...
      console.log(user);

      let userInfo = {
        UID: user.uid,
        userName: userOrRes.value,
        phNum: inptPhNum.value,
        country: inptSltCnt.value,
        city: slctdDpDown()
      }
      db.collection('User').doc(userInfo.UID).set(userInfo)
        .then((userPassedData) => {
          console.log(userPassedData, 'DONE');
          window.location = './Restraunts.html';
        }
        )
      // saveUserInfo(userInfo);


    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
      console.log(error)
    });

}

//******************  FOR DROPDOWN VALUE **********************
function slctdDpDown() {
  let slt;
  for (var i = 0; i < userSltDropDown.length; i++) {
    if (userSltDropDown.value) {
      slt = userSltDropDown.value
    }
  }
  return slt;

}

//%%%%%%%%%%%  Save Rst Collection %%%%%%%%%%%%%%%%%

// function saveRst(restToSave) {
//   db.collection('RESTRAUNT').doc(restToSave.UID).set(restToSave)
//     .then(console.log('done'))
// }
//%%%%%%%%%%%  Save User Collection %%%%%%%%%%%%%%%%%
// function saveUserInfo(userInfo){
//   db.collection('User').doc(userInfo.UID).set(userInfo)
//   .then(console.log('done'))
// }



//FOR LOGIN PG
function signInAsUser() {

  //Sign in existing users
  firebase.auth().signInWithEmailAndPassword(inptEmail.value, inptPswrd.value)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
      console.log(user);

      window.location = './Restraunts.html';
      fetchDataOfUser();
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error)
    });


}

function signInAsRestraunt() {
  //Sign in existing users
  firebase.auth().signInWithEmailAndPassword(inptEmail.value, inptPswrd.value)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
      console.log(user);
      window.location = './Restraunts.html';
      fetchDataOfRestraunt();

    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error)
    });
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;
    // ...
    console.log(uid)
  } else {
    // User is signed out
    // ...
  }
});

// %%%%%%%%%%%%%%%%%  fetch DATA OF RESTRAUNTS %%%%%%%%%%%%%%%%%%%%%%%%

async function fetchDataOfRestraunt() {
  await db.collection("Restraunt").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.id, doc.data());
    });
  });

}

// %%%%%%%%%%%%%%%%%  fetch DATA OF USER %%%%%%%%%%%%%%%%%%%%%%%%

function fetchDataOfUser() {
  db.collection("User").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.id, doc.data());
    });
  });
}


function bookOrder() {

  let deal1 = {
    item: 'Peri Bites',
    price: 499,
    status: 'pending'
  }
  console.log(deal1)



  db.collection("customer").add(deal1)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      customerData(docRef.id)
      customerData(docRef.id);
      window.location = './pending.html';




    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });


}

function bookOrder1() {
  let deal2 = {
    item: 'Exclusive Deal 02',
    price: 499,
    status: 'pending'
  }
  db.collection("customer").add(deal2)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      customerData(docRef.id)
      customerData(docRef.id);
      window.location = './pending.html';




    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });




}

function bookOrder2() {
  let deal3 = {
    item: 'ZINGER CHIESE',
    price: 450,
    status: 'pending'
  }
  db.collection("customer").add(deal3)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      customerData(docRef.id)
      customerData(docRef.id);
      window.location = './pending.html';




    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

// ##################  GET VALUE FROM RESTRAUNT SIDE %%%%%%%%%%%%%%%%%


db.collection("customer").get('TbuhD60eidVSTpAJZiVw')
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.id, doc.data());

      let ab = doc.id;
      if (ab === 'TbuhD60eidVSTpAJZiVw') {
        console.log(ab);

      }



    });
  });







