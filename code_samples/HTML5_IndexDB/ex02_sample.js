  const DB_NAME = 'cs701db';
  const DB_VERSION = 1;
  const DB_STORE_NAME = 'courses';

  var db;

  function createDb() {
    console.log("createDb ...");
   
    var request = window.indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onsuccess = function (evt) {
      db = request.result;
      console.log("createDb DONE");
      logMessage("createDb DONE");
    };
    
    request.onerror = function (evt) {
      console.error("createDb ERROR:", evt.target.errorCode);
      logMessage("createDb ERROR: " + evt.target.errorCode);
    };

    request.onupgradeneeded = function (evt) {
      console.log("createDb.onupgradeneeded ...");
      
      var store = evt.currentTarget.result.createObjectStore(
        DB_STORE_NAME, { keyPath: 'id'});

      store.createIndex('idIndex',       
                        'id',       { unique: true });
      store.createIndex('nameIndex',     
                        'name',     { unique: false });
      store.createIndex('typeIndex',     
                        'type',     { unique: false });
      store.createIndex('contactIndex',  
                        'contact',  { unique: false });
    };
  }

  var courses = [
   {"id": "cs520", "type": "core", "contact": "kalathur",
        "name": "Information Structures"},
   {"id": "cs546", "type": "elective", "contact": "temkin",
        "name": "Quantitative Methods for Information Systems"},
   {"id": "cs601", "type": "elective", "contact": "kalathur",
        "name": "Web Application Development"},
   {"id": "cs602", "type": "elective", "contact": "kalathur",
        "name": "Server-Side Web Development"},
   {"id": "cs625", "type": "core", "contact": "day",
        "name": "Business Data Comm and Networks"},
   {"id": "cs669", "type": "core", "contact": "rschudy",
        "name": "Database Design and Impl for Business"},
   {"id": "cs682", "type": "core", "contact": "kanabar",
        "name": "Information Systems Analysis and Design"},
   {"id": "cs683", "type": "elective", "contact": "braude",
        "name": "Mobile Application Development"},  
  {"id": "cs701", "type": "elective", "contact": "kalathur",
        "name": "Rich Internet Appl Development"},
   {"id": "cs782", "type": "core", "contact": "kanabar",
        "name": "IT Strategy and Management"}
];

  function populateDb() {

    var result = document.getElementById("result");
    result.innerHTML = "";

    if (!db)
      return;

    var transaction = db.transaction(DB_STORE_NAME, "readwrite");
    var store = transaction.objectStore(DB_STORE_NAME);                    
  
    courses.forEach(function (course) {
      
      var request = store.add({
        "id":       course.id,
        "type":     course.type,
        "contact":  course.contact,
        "name":     course.name
      });

      request.onsuccess = function(e) {
        console.log("Added", course.id);
        result.innerHTML = result.innerHTML + "<br/>" + 
                            "Added " +  course.id; 
      };
      
      request.onerror = function(e) {
        console.log("Error", e.target.error.message);
        result.innerHTML = result.innerHTML + "<br/>" +
          "Error " +  e.target.error.message
      };
    });
    
  }

  function openDb() {
    console.log("openDb ...");
    var openRequest = window.indexedDB.open(DB_NAME);
    
    openRequest.onerror = function(e) {
      console.log("Database error: " + e.target.errorCode);
    };

    openRequest.onsuccess = function(event) {
      db = openRequest.result;
    };  

  }

  function displayDb() {
    var result = document.getElementById("result");
    result.innerHTML = "";
    
    if (db) {
      try {
        var store = db.transaction(DB_STORE_NAME).objectStore(DB_STORE_NAME);
        
        var request = store.openCursor();
        
        request.onsuccess = function(evt) {  
          var cursor = evt.target.result;  
          if (cursor) {
            var course = cursor.value;
            var jsonStr = JSON.stringify(course);
            result.innerHTML = result.innerHTML + "<br/>" + jsonStr;         
            cursor.continue();  
          }  
        };

        request.onerror = function (evt) {
          console.error("displayDB ERROR:", evt.target.errorCode);
        };

      } catch (e) {
        console.log(e);
        logMessage(e);
      }
    }

  }

  function fetchCourse(courseId) {
  try {
    var result = document.getElementById("result");
    result.innerHTML = "";
   
    if (db) {
      var store = db.transaction(DB_STORE_NAME).objectStore(DB_STORE_NAME);
      store.get(courseId).onsuccess = function(event) {
        var course = event.target.result;
        if (course == null) {
          result.innerHTML = "Course not found";
        }
        else {          
          var jsonStr = JSON.stringify(course);
          result.innerHTML = jsonStr;
        }
      };
    }
  }
  catch(e){
    console.log(e);
  }
}


function updateCourse(courseId) {
  try {
    var result = document.getElementById("result");
    result.innerHTML = "";
    
    var jsonStr;
    var course;
      
    if (db) {

      var transaction = db.transaction(DB_STORE_NAME, "readwrite");
      var store = transaction.objectStore(DB_STORE_NAME);                    
      
      store.get(courseId).onsuccess = function(event) {
        course = event.target.result;
        // current value
        jsonStr = "OLD: " + JSON.stringify(course);
        result.innerHTML = jsonStr;
        
        // update record
        course.name = "New Course Title";
          
        var request = store.put(course);
          
        request.onsuccess = function(e) {
          console.log("Updated");
        };
        
        request.onerror = function(e) {
          console.log(e.value);
        };        

        // fetch record again
        store.get(courseId).onsuccess = function(event) {
          course = event.target.result;
          jsonStr = "<br/>NEW: " + JSON.stringify(course);
          result.innerHTML = result.innerHTML  + jsonStr;
        };
      }; 
    }
  }
  catch(e){
    console.log(e);
  }
}


  function displayCoreCourses() {
    try {
      var result = document.getElementById("result");
      result.innerHTML = "";
      
      if (db) {
         
        var store = db.transaction(DB_STORE_NAME).objectStore(DB_STORE_NAME);
        var index = store.index("typeIndex");
        var range = IDBKeyRange.only("core");
        
        index.openCursor(range).onsuccess = function(evt) {  
            var cursor = evt.target.result;    
            if (cursor) {
              var course = cursor.value;
              var jsonStr = JSON.stringify(course);
              result.innerHTML = result.innerHTML + "<br/>" + jsonStr;         
              cursor.continue();  
            }  
        };
      }
    }
    catch(e){
      console.log(e);
      logMessage(e);
    }
  }

  function displayCourses1() {
    try {
      var result = document.getElementById("result");
      result.innerHTML = "";
      
      if (db) {
        var store = db.transaction(DB_STORE_NAME).objectStore(DB_STORE_NAME);
        var index = store.index("idIndex");

        var range = IDBKeyRange.lowerBound("cs600");
        
        index.openCursor(range).onsuccess = function(evt) {  
            var cursor = evt.target.result;    
            if (cursor) {
              var course = cursor.value;
              var jsonStr = JSON.stringify(course);
              result.innerHTML = result.innerHTML + "<br/>" + jsonStr;         
              cursor.continue();  
            }  
        };
      }
    }
    catch(e){
      console.log(e);
    }
  }

  function displayCourses2() {
    try {
      var result = document.getElementById("result");
      result.innerHTML = "";
      
      if (db) {
        var store = db.transaction(DB_STORE_NAME).objectStore(DB_STORE_NAME);
        var index = store.index("idIndex");

        var range = IDBKeyRange.upperBound("cs600", true);
        
        index.openCursor(range).onsuccess = function(evt) {  
            var cursor = evt.target.result;    
            if (cursor) {
              var course = cursor.value;
              var jsonStr = JSON.stringify(course);
              result.innerHTML = result.innerHTML + "<br/>" + jsonStr;         
              cursor.continue();  
            }  
        };
      }
    }
    catch(e){
      console.log(e);
    }
  }

  function displayCourses3() {
    try {
      var result = document.getElementById("result");
      result.innerHTML = "";
      
      if (db) {
        var store = db.transaction(DB_STORE_NAME).objectStore(DB_STORE_NAME);
        var index = store.index("idIndex");

        var range = IDBKeyRange.bound("cs600", "cs700", false, true);
        
        index.openCursor(range).onsuccess = function(evt) {  
            var cursor = evt.target.result;    
            if (cursor) {
              var course = cursor.value;
              var jsonStr = JSON.stringify(course);
              result.innerHTML = result.innerHTML + "<br/>" + jsonStr;         
              cursor.continue();  
            }  
        };
      }
    }
    catch(e){
      console.log(e);
    }
  }

  function clearAllCourses() {
  try {
    
    if (db) {

      var transaction = db.transaction(DB_STORE_NAME, "readwrite");
      var store = transaction.objectStore(DB_STORE_NAME);  

      store.clear().onsuccess = function(event) {
        logMessage("Courses object store data cleared");
      };
    }
  }
  catch(e){
    console.log(e);
    logMessage(e);
  }
}


  function deleteDb() {
    console.log("deleteDb ...");
    var request = window.indexedDB.deleteDatabase(DB_NAME);
  
    
    request.onsuccess = function (evt) {
      db = undefined;
      console.log("deleteDb DONE");
      logMessage("deleteDb DONE");
    };
    
    request.onerror = function (evt) {
      console.error("deleteDB ERROR:", evt.target.errorCode);
      logMessage("deleteDB ERROR:" + evt.target.errorCode);
    };
  }

  function logMessage(msg) {
     var result = document.getElementById("result");
     result.innerHTML = '<b>' + msg + '<b>';
  }


















































