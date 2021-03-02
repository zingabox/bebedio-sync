/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	// REACT DEPENDENCIES ADDED BY JAFET
	import { Entity, Scene } from 'aframe-react';
	import React from 'react';
	import ReactDOM from 'react-dom';

	import {FirebaseWrapper} from './firebaseWrapper.js'
	  import $ from "jquery";

	// import {FirebaseWrapper} from '../../../modified_modules/aframe-firebase-component/firebaseWrapper.js'


	// console.log('the rapa is')
	// console.log(FirebaseWrapper)


	// var GeoFire = require('geofire');

	// var FirebaseWrapper = require('./firebaseWrapper');

	var getComponentProperty = AFRAME.utils.entity.getComponentProperty;
	var setComponentProperty = AFRAME.utils.entity.setComponentProperty;

	if (typeof AFRAME === 'undefined') {
	  throw new Error('Component attempted to register before AFRAME was available.');
	}


	/**
	 * Broadcast.
	 */
	AFRAME.registerComponent('firebase-broadcast', {
	  schema: {
	    id: { default: '' },
	    components: { default: ['position', 'rotation'] },
	    componentsOnce: { default: [], type: 'array' }
	  },

	  init: function(oldData) {
	    var data = this.data;
	    var el = this.el;
	    var system = el.sceneEl.systems.firebase;

	    if (data.components.length) {
	      system.registerBroadcast(el);
	    }
	  }
	});

	// export var  reactComponent= null
	// export var  entitySpawner= null
	export function entitySpawner(id, entityData) { //JUST ADDED PARAMETER
	    console.log('about to add the following entity:')
	    console.log(id)
	      if (id != "player" &
	        id != "enclosure" &
	        id != "thecam" &
	        id != "cursio") {
	        entityData.id = id;

	        var entities = listEntities;
	        // var copy = this.Entities.slice(); //just commented out by jafet 3 25 2019
	        var newEntity = entityData

	        // if (~entities.includes(entityData)) {
	          entities.push(newEntity)
	          // debugger

	          //IN THE INITIAL LOAD, THIS COULD BE HAPPENING BEFORE THE COMPONENT IS MOUNTED, AND YOU DO NOT WANT THAT
	          // this.setState({
	          //   Entities: entities
	          //   // Entities: 
	          // }, () => {
	          // });
	          // listEntities = entities
	          listEntities = entities
	          // console.log('forcing an update')
	          // this.forceUpdate()
	          //ADDED BY JAFET
	          var newEntity;
	          
	          if ('primitive' in newEntity)
	          {
	            newEntity=document.createElement(entityData.primitive)
	          }
	          else{
	            newEntity = document.createElement('a-entity')
	          }
	          
	          Object.entries(entityData).forEach(([key, value]) => {
	              // console.log('the retrieved value is')
	              // console.log(value)
	            // if(key=='provenance')
	            // if((typeof value) =='object' && key=='provenance')//&& key!=='upon-insertion' && key!=='light' && key!=='material')
	            if((typeof value) =='object')//&& key!=='upon-insertion' && key!=='light' && key!=='material')
	            {
	              console.log('provenance value is')
	              console.log(value)
	              value=JSON.parse(JSON.stringify(value))
	            }
	              newEntity.setAttribute(key,value)
	          });

	          newEntity.addEventListener('componentchanged',handleChange)
	          document.querySelector('a-scene').appendChild(newEntity)
	          
	          //THERE SHOULD NOT BE ANY SPECIAL TREATMENT FOR A CONTAINER IN HERE
	          //ALL OF THIS SHOULD BE DONE IN THE CONTAINER ITSELF BY USING THE TENSOR API
	          // if (entityData.primitive == "a-gui-button") {
	          //   console.log('I just added a menu item bro')
	          // }
	        // }
	      }
	      else {}
	      return (entityData)
	    }




	// export var  entityRemover= null
	export function entityRemover(id) {
	      console.log('received an entity removal request')
	      var elem = document.getElementById(id)
	      if (elem !== null) {
	        var entities = listEntities;
	        $( "#"+id ).detach();
	        
	        ////DO NOT REMOVE THIS UNTIL YOU ARE SURE. IT IS RELATED TO THE CODER AND WAS COMMENTED OUT TEMPORARILY
	        // window.loadHtml()
	      }
	        var index = localFindEntity(id, entities)
	        if(index!==null)
	        entities.splice(index, 1)
	        listEntities=entities
	    }


	// export var  entityChanger= null
	export function entityChanger(id, entityData) { //JUST ADDED PARAMETER
	      //THE FOLLOWING LINE MIGHT BE UNNECESSARY
	      entityData.id = id;
	      if (id != playerId &
	        id != "enclosure" &
	        id != "thecam" &
	        id != "cursio") {

	        var copy = listEntities.slice();
	        var entities = listEntities;
	        var index = localFindEntity(id, entities)

	             var elem = document.getElementById(id)
	          var node = document.getElementById(id)
	        if (index !== null && node !== null) {
	          entities[index] = entityData;

	          //REPLACEMENT STUFF
	          listEntities = entities

	          Object.keys(entityData).forEach(function(key, index) {
	            var value = entityData[key]
	            // if(key=='provenance')
	            // if((typeof value) =='object' && key=='provenance')//&& key!=='upon-insertion' && key!=='light' && key!=='material')
	            if ((typeof value) == 'object') //&& key!=='upon-insertion' && key!=='light' && key!=='material')
	            {
	              value = JSON.parse(JSON.stringify(value))
	            }
	            node.setAttribute(key, value)
	          }.bind(this))
	          
	          ////THIS SHOULD ACTUALLY BE DONE IN ONE OF THOSE INITIALIZATION METHODS THAT YOU HAVE IN THE MUTATION OBSERVER CALLBACK!!!!!!!!
	          ////LIKE THE UPON-INSERTION METHOD OR ONE OF THOSE
	          if(Object.keys(entityData).includes("vr-dat-gui-2"))
	          {
	            node.components['vr-dat-gui-2'].init()
	          }
	          
	          
	        } 
	        else {
	          entitySpawner(id,entityData)
	          
	          // console.log('Inserting new entity and forcing update')
	          // var entities = this.Entities;
	          // entities.push(entityData)
	          // this.Entities=entities

	          // //HERE YOU ARE SUPPOSED TO INSERT A NEW OBJECT INTO THE DOM
	          // console.log('calling this force an update!!!!')
	          // // this.forceUpdate()
	          // //JUST ADDED BY JAFET
	          // var node=document.getElementById(id)
	          // Object.keys(entityData).forEach(function(key,index){
	          //           var value=entityData[key]    
	          //   // if(key=='provenance')
	          //   // if((typeof value) =='object' && key=='provenance')//&& key!=='upon-insertion' && key!=='light' && key!=='material')
	          //   if((typeof value) =='object')//&& key!=='upon-insertion' && key!=='light' && key!=='material')
	          //   {
	          //     console.log('provenance value is')
	          //     console.log(value)
	          //     value=JSON.parse(JSON.stringify(value))
	          //   }
	          //   node.setAttribute(key,value)
	          // }.bind(this))
	        }
	        //MAYBE THIS force.Update() LINE IS NOT NECESSARY!!!
	                  // this.forceUpdate()
	      }
	      return (entityData)
	    }


	export function localFindEntity(id, entities) {
	      function searchEntity(element, index) {
	        //JUST ADDED THESE FEW LINES
	        var evaluation = element.id === this.id
	        if (evaluation) {
	          this.index = index
	        }
	        return evaluation
	      }
	      // State change will cause component re-render
	      var toPassAsThis = {};
	      toPassAsThis.id = id;
	      toPassAsThis.index = null
	      entities.some(searchEntity, toPassAsThis)
	      var index = toPassAsThis.index
	      return index
	    }
	    
	    
	export function getChangedEntityData(id, componentName, componentData) { //JUST ADDED PARAMETER
	      var entities = listEntities;
	      var index = localFindEntity(id, listEntities)
	      entities[index][componentName] = componentData;
	      return entities[index];
	    }

	export function handleChange(evt) {
	      var id = evt.target.id
	      var attName=evt.detail.name
	      if(attName==='animation')
	      {
	        attName='animation__'+evt.detail.id
	      }
	      var newData_allComps = getChangedEntityData(id, evt.detail.name, evt.target.getAttribute(attName))
	      setChangedComponentData(newData_allComps)
	    }
	    
	    
	    
	    


	export var  changedComponentData= null
	export var  changedComponentDataDownstream_id= null
	export var  changedComponentDataUpstream_id= null
	export var  changed= false
	export var  changedComponentId= null
	export var  playerId= null

	  // reactComponent: null,
	  // entitySpawner: null,
	  // entityChanger: null,
	  // entityRemover: null,
	  // changedComponentData: null,
	  // changedComponentDataDownstream_id: null,
	  // changedComponentDataUpstream_id: null,
	  // changed: false,
	  // changedComponentId: null,
	  // playerId: null,



	export var listEntities = []


	export  function setPlayerId(playerId2) {
	    // this.playerId = playerId2;
	    playerId = playerId2;
	  }
	// export  function setReactComponent(reactComponent2) {
	//     // this.reactComponent = reactComponent2;
	//     reactComponent = reactComponent2;
	//   }
	// export  function setEntitySpawner(entitySpawner2) {
	//     entitySpawner = entitySpawner2;
	//   }
	// export  function setEntityChanger(entityChanger2) {
	//     // this.entityChanger = entityChanger;
	//     entityChanger = entityChanger2;
	//   }
	// export  function setEntityRemover(entityRemover2) {
	//     // this.entityRemover = entityRemover;
	//     entityRemover = entityRemover2;
	//   }
	export  function setChangedComponentData(changedComponentData2) {
	    // this.changedComponentData = changedComponentData;
	    // this.changed = true
	    changedComponentData = changedComponentData2;
	    changed = true
	  }
	export  function registerFirebaseSystem() {

	    /**
	     * Firebase system.
	     */
	    AFRAME.registerSystem('firebase', {
	      schema: {
	        apiKey: { type: 'string' },
	        authDomain: { type: 'string' },
	        channel: { type: 'string' },
	        databaseURL: { type: 'string' },
	        interval: { type: 'number' },
	        storageBucket: { type: 'string' }
	      },


	      init: function() {
	        // // Get config.
	        // var config = this.data;

	        // if (!config.apiKey && !window.debug) {
	        //   return;
	        //   console.log("SORRY BRO AM RETURNING")
	        // }

	        // this.broadcastingEntities = {};
	        // this.entities = {};
	        // this.interval = config.interval || 10;

	        // // Set up Firebase.
	        // console.log("DOING THE WRAPPER")
	        // var FirebaseWrapper = require('./firebaseWrapper');
	        // console.log("DONE WITH THE WRAPPER")

	        // var firebaseWrapper = this.firebaseWrapper = new FirebaseWrapper();
	        // firebaseWrapper.init(config);
	        // this.firebase = firebaseWrapper.firebase;
	        // this.database = firebaseWrapper.database;
	        // console.log("ABOUT TO FETCH ENTITIES")
	        // firebaseWrapper.getAllEntities().then(this.handleInitialSync.bind(this));
	        // firebaseWrapper.onEntityAdded(this.handleEntityAdded.bind(this));
	        // firebaseWrapper.onEntityChanged(this.handleEntityChanged.bind(this));
	        // firebaseWrapper.onEntityRemoved(this.handleEntityRemoved.bind(this));
	        ////NOW IT IS THIS
	        const startPos = { x: 0, z: 0 }
	        this.loadThisBitch(this.data.channel, startPos)
	      },


	      updatePosition: function(coords) {
	        // this.firebaseWrapper.updatePosition(coords,this.handleEntityAdded.bind(this),this.handleEntityRemoved.bind(this))
	        this.firebaseWrapper.updatePosition(coords)
	        // this.firebaseWrapper.onEntityAdded(this.handleEntityAdded.bind(this));
	        // this.firebaseWrapper.onEntityChanged(this.handleEntityChanged.bind(this));
	        // this.firebaseWrapper.onEntityRemoved(this.handleEntityRemoved.bind(this));

	      },
	      loadThisBitch: function(channel, coords) {
	        // Get config.
	        var config = this.data;

	        if (!config.apiKey && !window.debug) {
	          return;
	          console.log("SORRY BRO AM RETURNING")
	        }

	        this.broadcastingEntities = {};
	        this.entities = {};
	        this.interval = config.interval || 10;

	        // Set up Firebase.
	        // var FirebaseWrapper = require('./firebaseWrapper');
	        // var firebaseWrapper = require('./firebaseWrapper');

	        // import {FirebaseWrapper as firebaseWrapper} from './firebaseWrapper'
	        // console.log('the wrapper alias is')
	        // console.log(FirebaseWrapper)
	        console.log('the wrapper is')
	        console.log(firebaseWrapper)
	        // console.log('the wrapper2 is')
	        // console.log(FirebaseWrapper)

	        var firebaseWrapper = this.firebaseWrapper = new FirebaseWrapper();
	        this.firebaseWrapper=firebaseWrapper
	        firebaseWrapper.init(config);
	        this.firebase = firebaseWrapper.firebase;
	        this.database = firebaseWrapper.database;
	        // console.log("ABOUT TO FETCH ENTITIES")
	        // firebaseWrapper.getAllEntities().then(function() {
	        //   this.handleInitialSync.bind(this)
	        // }.bind(this));


	        // this.updatePosition({x:0,z:0},this.handleEntityAdded.bind(this),this.handleEntityRemoved.bind(this))
	        
	        // firebaseWrapper.onEntityAdded(this.handleEntityAdded.bind(this));
	        // firebaseWrapper.onEntityChanged(this.handleEntityChanged.bind(this));
	        // firebaseWrapper.onEntityRemoved(this.handleEntityRemoved.bind(this));
	        firebaseWrapper.onEntityAdded(this.handleEntityAdded.bind(this));
	        firebaseWrapper.onEntityChanged(this.handleEntityChanged.bind(this));
	        firebaseWrapper.onEntityRemoved(this.handleEntityRemoved.bind(this));


	        // console.log('Now fetching keys withing radius')
	        // firebaseWrapper.getEntitiesByRadius().then(function(keyList) {
	        //   console.log("this is the data that was retrieved")
	        //   console.log(keyList)
	        //   const data = {}
	        //   keyList.forEach(function(objectId, index, array) {
	        //     firebaseWrapper.entsRef.child(objectId).once('value', function(snapshot) {
	        //       const theVal = snapshot.val()
	        //       console.log('just retrieved this bro')
	        //       console.log(theVal)
	        //       if (theVal !== null && theVal !== undefined) {
	        //         const key = Object.keys(theVal)[0]
	        //         data[key] = theVal
	        //       }
	        //       // resolve(snapshot.val() || {});
	        //     });
	        //   })
	        //   // this.handleInitialSync.bind(this)
	        // }.bind(this));





	      },

	      // /**
	      // * Initial sync.
	      // */
	      // handleInitialSync: function(data) {
	      //   console.log('doing handle initial sync')
	      //   var self = this;
	      //   var broadcastingEntities = this.broadcastingEntities;
	      //   console.log("Data inside handleInitialSync is and with the new method: ")
	      //   console.log(data)
	      //   Object.keys(data).forEach(function(entityId) {
	      //     self.handleEntityAdded(entityId, data[entityId]);
	      //   });
	      //   // THIS IS HOW YOU INITIALIZE A COMPONENT THAT DOES NOT INITIALIZE WELL ON ITS OWN. YOU MAY NEED TO USE 
	      //   // SOMETHING ELSE INSTEAD OF UPDATE AND MAYBE LISTEN TO A DIFFERENT EVENT IF NEEDED
	      //   // console.log('bro this is the value')
	      //   // console.log(document.querySelector('a-scene').querySelectorAll('[environment]')[0])
	      //   // if (document.querySelector('a-scene').querySelectorAll('[environment]')[0] !== undefined) {
	      //   //   try {
	      //   //     document.querySelector('a-scene').querySelectorAll('[environment]')[0].components.environment.update()
	      //   //   }
	      //   //   catch (error) {
	      //   //     document.querySelector('a-scene').querySelectorAll('[environment]')[0].addEventListener('componentinitialized', function(evt) {
	      //   //       console.log('evt is')
	      //   //       console.log(evt)
	      //   //       if (evt.detail.name === 'environment') {
	      //   //         // console.log('Entity has moved to', evt.target.getAttribute('position'), '!');
	      //   //         console.log('Updating environment')
	      //   //         document.querySelector('a-scene').querySelectorAll('[environment]')[0].components.environment.update()
	      //   //       }
	      //   //     });
	      //   //   }
	      //   // }


	      // },

	      /**
	       * Entity added.
	       */
	      handleEntityAdded: function(id, data) {

	        // console.log('adding entity with data:')
	        // console.log(data)
	        // Already added.
	        if (this.entities[id] || this.broadcastingEntities[id]) {
	          // console.log("JUST RETURNING BRO")
	          return;
	        }

	        this.broadcastingEntities[id] = "Its nuts."
	        this.entities[id] = "Its nuts too."

	        var entity = entitySpawner(id, data);
	        this.entities[id] = entity;
	        // console.log("DOING THE INITIAL SYYYYYYYNC")
	      },

	      /**
	       * Entity updated.
	       */
	      handleEntityChanged: function(id, components) {
	        var entity = entityChanger(id, components);
	      },

	      /**
	       * Entity removed. Detach.
	       */
	      handleEntityRemoved: function(id) {
	        console.log('calling entity removed from the component')
	        this.entities[id]=false
	        this.broadcastingEntities[id]=false
	        entityRemover(id);
	      },

	      /**
	       * Register.
	       */
	      registerBroadcast: function(el) {
	        var broadcastingEntities = this.broadcastingEntities;

	        // Initialize entry, get assigned a Firebase ID.
	        var id = this.firebaseWrapper.createEntity();

	        setTimeout(function() {
	          broadcastingEntities[id] = el;
	          el.setAttribute('firebase-broadcast', 'id', id);
	        });

	        // Remove entry when client disconnects.
	        this.firebaseWrapper.removeEntityOnDisconnect(id);
	      },

	      /**
	       * Broadcast.
	       */
	      tick: function(time) {
	        if (!this.firebase) { return; }

	        var firebaseWrapper = this.firebaseWrapper;

	        if (time - this.time < this.interval) { return; }
	        this.time = time;

	        if (!changed)
	          return
	        try {
	          if (changedComponentData.vr_player) // && (changedComponentData.id != playerId))
	          {
	            changed = false
	            return
	          }
	          firebaseWrapper.updateEntity(changedComponentData.id, changedComponentData);
	          changed = false
	        }
	        catch (e) {}
	      },
	    });
	  }
	// }
	// export {exports}
	;


/***/ })
/******/ ]);