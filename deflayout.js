HTMLDivElement.prototype.setAttributes = function(attributes) {
  var i = 0
    , keys = Object.keys(attributes)
    , length = keys.length
    , attribute = ""
    , style = "";

  for (i = 0; i < length; i ++) {
    attribute = keys[i] + ":" + attributes[keys[i]] + ";";
    style += attribute;
  }
  this.setAttribute("style", style);
  return this;
};

var div = "div"
  , width = "width"
  , height = "height"
  , background = "background"
  , createView = function(type, attributes, subviews) {
      var view = document.createElement(type).setAttributes(attributes)
        , i = 0
        , length = subviews.length;

      for (i = 0; i < length; i++) {
        view.appendChild(subviews[i]);
      }
      return view;
  }
  , createViewStatement = function(viewSpec) {
      var type = viewSpec[0]
        , attributes = viewSpec[1]
        , subViewSpecs = viewSpec.slice(2)
        , i = 0
        , lastPhase = false
        , length = subViewSpecs.length
        , subviewStatements = "[";

      for(i = 0; i < length; i++) {
        if (i === (length - 1)) lastPhase = true;
        subviewStatements += createViewStatement(subViewSpecs[i]);
        if (!lastPhase) subviewStatements += ", ";
      }
      subviewStatements += "]";

      return "createView(" + type + ", " + JSON.stringify(attributes) + ", " + subviewStatements + ")";
    }
  , deflayout = function(layout) {
      document.body.appendChild(eval(createViewStatement(layout)));
    };
