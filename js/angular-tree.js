var tree = angular.module('angular.tree',['ui.bootstrap']);

tree.directive('tree',['$compile',function($compile){
  return {
    restrict: 'E',
    replace: 'true',
    template: '<div class="well tree-container">' +
                '<node ng-repeat="nodeData in nodes" node="nodeData"></node>' +
              '</div>',
    link: function(scope,elem,attrs){
      scope.nodes = angular.copy(scope[attrs.nodes]);
      scope.show = function(){
        console.log(scope.nodes);  
      };    
    }
  };
}]);

tree.directive('node',['$compile',function($compile){
  return {
    restrict: 'E',
    replace: true,
    scope: {
      node: '='    
    },  
    template: '<div class="panel-heading">' +
                '<div class="tree-node" ng-if="!node.removed">' +
                  '<span class="tree-icon glyphicon glyphicon-chevron-down" ng-if="node.nodes.length>0 && node.showNodes" ng-click="toggle()"></span>' +
                  '<span class="tree-icon glyphicon glyphicon-chevron-right" ng-if="node.nodes.length>0 && !node.showNodes" ng-click="toggle()"></span>' +
                  '<span ng-class="{\'leaf-node\': node.nodes.length==0,\'non-leaf-node\': node.nodes.length>0}" ' +
                    'ng-dblclick="editNode()" ng-if="!node.editing">{{node.title}}</span>' +
                  '<input ng-class="{\'edit-node\': node.nodes.length==0}" type="text" ng-model="node.title" ng-if="node.editing"  id="node{{node.id}}"/>' + 
                  '<span class="tree-icon glyphicon glyphicon-ok" ng-if="node.editing" ng-click="doneEditingNode()"></span>' +
                  '<span class="pull-right" ng-if="!node.editing">' +
                      '<span class="tree-icon glyphicon glyphicon-plus" ng-click="addNode()"></span>' +
                      '<span class="tree-icon glyphicon glyphicon-minus" ng-click="removeNode()"></span>' +
                  '</span>' +
                '</div>',
    link: function(scope,elem,attrs){
      scope.toggle = function(){
        scope.node.showNodes = !scope.node.showNodes; 
      }; 
      if(angular.isUndefined(scope.node.new)) {   
        scope.node.showNodes = false;    
        scope.node.editing = false;  
      }
      if(angular.isUndefined(scope.node.removed)){
        scope.node.removed = false;  
      }    
      scope.editNode = function(){ 
        scope.node.editing = true;
      };
      scope.doneEditingNode = function(){
        scope.node.editing = false;    
      };
      scope.addNode = function(){
        scope.node.showNodes = true;  
        scope.node.nodes.push({
          title: '',
          showNodes: false,
          editing: true,    
          nodes: [],
          new: true,
          id: fetchRandomNum()    
        }); 
        if(scope.node.nodes.length==1){
            elem.html(this.template);
            elem.append('<div class="child-nodes-show" ng-if="node.showNodes">' +
                            '<node ng-repeat="nodeData in node.nodes" node="nodeData"></node>' +
                        '</div>' +
                        '</div>');
            $compile(elem.contents())(scope); 
        }
      };
      scope.removeNode = function(){
        scope.node.removed = true;
        var parentScope = angular.element(elem[0].parentElement).scope(); 
        if(angular.isDefined(parentScope.node)){  
            var flag = true;
            for(i in parentScope.node.nodes){
                if(!parentScope.node.nodes[i].removed){
                    flag = false;
                    break;
                }
            }
            if(flag){
                parentScope.node.showNodes = false;
                parentScope.node.nodes.length = 0;
            }  
        }
        else {
            for(i in parentScope.nodes){
                if(parentScope.nodes[i].id == scope.node.id){
                    parentScope.nodes.splice(i,1);
                }
            };
        }
        elem[0].parentElement.removeChild(elem[0]);         
      };    
      if(scope.node.nodes.length>0){
        scope.node.showNodes = false;
        elem.append('<div class="child-nodes-show" ng-if="node.showNodes">' +
                        '<node ng-repeat="nodeData in node.nodes" node="nodeData"></node>' +
                    '</div>' +
                    '</div>');
        $compile(elem.contents())(scope);
      }
      function fetchRandomNum(){
          return Math.floor(Math.random() * 2000000);
      }    
    }
  }
}]);
