# angular-tree
a tree structure with add/edit/delete of nodes

include bootstrap css and js files in index.html,
along with angular-tree.js and angular-tree.css files from this project

HTML template - <tree nodes="nodeList"></tree>
where $scope.nodeList should have the json structure in the following format - 

$scope.nodeList = [
  {
    "id": 3,
    "title": "node3",
    "nodes": [
      {
        "id": 31,
        "title": "node3.1",
        "nodes": []
      },
      {
        "id": 31,
        "title": "node3.2",
        "nodes": [
          {
            "id": 310,
            "title": "node3.2.1",
            "nodes": []
          }
        ]
      },
      {
        "id": 32,
        "title": "node3.3",
        "nodes": []
      },
      {
        "id": 33,
        "title": "node3.4",
        "nodes": [
          {
            "id": 330,
            "title": "node3.4.1",
            "nodes": [
              {
                "id": 3300,
                "title": "node3.4.1.1",
                "nodes": []
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 4,
    "title": "node4",
    "nodes": [
      {
        "id": 41,
        "title": "node4.1",
        "nodes": []
      },
      {
        "id": 41,
        "title": "node4.2",
        "nodes": [
          {
            "id": 410,
            "title": "node4.2.1",
            "nodes": []
          }
        ]
      },
      {
        "id": 42,
        "title": "node4.4",
        "nodes": []
      },
      {
        "id": 44,
        "title": "node4.4",
        "nodes": [
          {
            "id": 440,
            "title": "node4.4.1",
            "nodes": [
              {
                "id": 4400,
                "title": "node4.4.1.1",
                "nodes": []
              }
            ]
          }
        ]
      }
    ]
  }    
];
