// var firebase = require('firebase');
import { fb, FBAppDatabase } from '../../client/src/firebaseInit.js'
var firebase = require('firebase/app');
// require('firebase/auth');
require('firebase/database');

console.log('out it is')
console.log(FBAppDatabase)

var parse = require('url-parse');

var channelQueryParam = parse(location.href, true).query['aframe-firebase-channel'];

var GeoFire = require('geofire');

// function FirebaseWrapper() {}

class FirebaseWrapper {

constructor() {
        }
  // init = function(config) {
  init(config) {
    // console.log("Channel query param:")
    // console.log(channelQueryParam)
    // console.log("config.userId:")
    // console.log(config.userId)
    // this.user = channelQueryParam || config.user || 'default';
    // this.world = channelQueryParam || config.world || 'default';
    
    console.log('in it is')
console.log(FBAppDatabase)

    this.userId = config.userId;
    this.world = config.world;
    this.firebase = fb //firebase.initializeApp(config);
    this.database = FBAppDatabase.ref("worlds");

    // var path = '/worlds/IHrDNzGNysbbgcQRC4TY7lREz4r2/a71/locations/' ///entities'
    this.entsRef = this.firebase.database().ref("worlds").child(this.userId).child(this.world).child('entities') //ref(path);
    this.locsRef = this.firebase.database().ref("worlds").child(this.userId).child(this.world).child('locations') //ref(path);

    this.radius = .2
    // this.position={x:0,z:0}
    this.geo = new GeoFire.GeoFire(this.locsRef);
    this.geoQuery = this.geo.query({
      // center: [0, 0],
      // center: [(1 / 78701) * this.position.x, -(1 / 111300) * this.position.z],
      center: [(1 / 78701) * 0, -(1 / 111300) * 0],
      // radius: .1 //in kilometers
      radius: this.radius //in kilometers
    });
    this.keyEntered = null
    this.keyExited = null

    // this.keyEntered = this.geoQuery.on("key_entered", function(key, location, distance) {}.bind(this));
    // this.keyExited = this.geoQuery.on("key_exited", function(key, location, distance) {}.bind(this));
  };

  // FirebaseWrapper.prototype.getAllEntities = function() {
  //   var database = this.database;
  //   var userId = this.userId;
  //   var world = this.world;
  //   return new Promise(function(resolve) {
  //     database.child(userId).child(world).child('entities').once('value', function(snapshot) {
  //       resolve(snapshot.val() || {});
  //     });
  //   });
  // };

  // FirebaseWrapper.prototype.getEntitiesByRadius = function() {
  //   // var database = this.database;
  //   // var userId= this.userId;
  //   // var world = this.world;
  //   // return new Promise(function (resolve) {
  //   //   database.child(userId).child(world).child('entities').once('value', function (snapshot) {
  //   //     resolve(snapshot.val() || {});
  //   //   });
  //   // });
  //   var geoQuery = this.geo.query({
  //     center: [0, 0],
  //     radius: 380
  //   });
  //   var objects = [];
  //   // var onKeyEnteredRegistration = geoQuery.on("key_entered", function(key, location, distance) {
  //   //   objects[objects.length] = key;
  //   //   console.log(key + " entered query at " + location + " (" + distance + " km from center)");
  //   // });
  //   console.log(this.geo.ref())
  //   return new Promise(function(resolve) {
  //     return geoQuery.on("ready", function() {
  //       console.log("GeoQuery has loaded and fired all other events for initial data");
  //       resolve(objects);
  //       // database.child(userId).child(world).child('entities').once('value', function(snapshot) {
  //     });
  //   });
  //   // return new Promise(function(resolve) {
  //   //   // database.child(userId).child(world).child('entities').once('value', function(snapshot) {
  //   //   resolve("here is the fake data");
  //   // });
  // };


  // FirebaseWrapper.prototype.updatePosition = function(coords, enteredHandler, exitedHandler) {
  updatePosition(coords) {
      // this.position=coords  
      // console.log('updating query with coords')
      // console.log(coords)

      //   if(this.keyEntered!==null)
      //   {
      //   this.keyEntered.cancel(); 
      //   }
      //   if(this.keyExited!==null)
      //   {
      //   this.keyExited.cancel(); 
      //   }
      //       // NOW IT IS THIS
      //   this.keyEntered = this.geoQuery.on("key_entered", function(key, location, distance) {
      //     // objects[objects.length] = key;
      //     console.log(key + " entered query at " + location + " (" + distance + " km from center)");
      //     this.entsRef.child(key).once('value', function(snapshot) {
      //       var theVal = snapshot.val()
      //       if (theVal !== null && theVal !== undefined) {
      //         enteredHandler(key, theVal);
      //       }
      //     });
      //   }.bind(this));

      //     // if(this.)
      // this.keyExited = this.geoQuery.on("key_exited", function(key, location, distance) {
      //   // objects[objects.length] = key;
      //   // console.log(key + " entered query at " + location + " (" + distance + " km from center)");
      //   // this.entsRef.child(key).once('value', function(snapshot) {
      //   // var theVal = snapshot.val()
      //   // if (theVal !== null && theVal !== undefined) {
      //   exitedHandler(key);
      //   // }
      //   // });
      // }.bind(this));

      // this.keyExited.cancel();
      // this.geoQuery.cancel()
      // this.geoQuery = this.geo.query({
      //   // center: [0, 0],
      //   // center: [(1 / 78701) * this.position.x, -(1 / 111300) * this.position.z],
      //   center: [(1 / 78701) * coords.x, -(1 / 111300) * coords.z],
      //   // radius: .1 //in kilometers
      //   radius: .03 //in kilometers
      // });





      this.geoQuery.updateCriteria({
        center: [(1 / 78701) * coords.x, -(1 / 111300) * coords.z],
        radius: this.radius //use .1 for 100meters
      });
    }

    onEntityAdded(handler) {
      ////PREVIOUSLY IT WAS ONLY THIS
      // this.database.child(this.userId).child(this.world).child('entities').on('child_added', function(data) {
      //   console.log('a child was added!!!!')
      //   handler(data.key, data.val());
      // });

      // NOW IT IS THIS
      this.keyEntered = this.geoQuery.on("key_entered", function(key, location, distance) {
        // objects[objects.length] = key;
        console.log(key + " entered query at " + location + " (" + distance + " km from center)");
        this.entsRef.child(key).once('value', function(snapshot) {
          var theVal = snapshot.val()
          if (theVal !== null && theVal !== undefined) {
            // console.log('THE VALUE WAS NULL SO NO CALLING HANDLER')
            handler(key, theVal);
          }
        });
      }.bind(this));
    };

  onEntityChanged(handler) {
    this.database.child(this.userId).child(this.world).child('entities').on('child_changed', function(data) {
      handler(data.key, data.val());
    });
  };

  onEntityRemoved(handler) {
    ////PREVIOUSLY IT WAS THIS
    this.database.child(this.userId).child(this.world).child('entities').on('child_removed', function(data) {
      handler(data.key);
    });

    // NOW IT IS THIS
    // if(this.)
    this.keyExited = this.geoQuery.on("key_exited", function(key, location, distance) {
      // objects[objects.length] = key;
      console.log(key + " exited query at " + location + " (" + distance + " km from center)");
      // this.entsRef.child(key).once('value', function(snapshot) {
      // var theVal = snapshot.val()
      // if (theVal !== null && theVal !== undefined) {

      if (key !== 'enclosure' && key !== 'player' && key !== 'thecam' && key !== 'cursio') {
        handler(key);
      }
      // }
      // });
    }.bind(this));
  };

  clearLocalWorld() {
    // this.database.child(this.userId).child(this.world).child('entities').on('child_removed', function (data) {
    //   handler(data.key);
    // });
  };

  removeEntityOnDisconnect(id) {
    this.database.child(this.userId).child(this.world).child('entities').child(id).onDisconnect().remove();
  };

  createEntity() {
    return this.database.child(this.userId).child(this.world).child('entities').push().key;
  };

  updateEntity(id, data) {
    this.database.child(this.userId).child(this.world).child('entities/' + id).update(data);
  };
}



// module.exports = FirebaseWrapper;
export { FirebaseWrapper }
