
var partial_registry = {};
var hooks = {};

var offset = 0;
var zi = 0;

// here we load a div of some sort. When its done loading we run event handler
var ap_showPartial = function(url,container){
  var ct = container;
  if(container == null)
    ct = $('container');
  
  var el = new Element('div',{
    'styles':{
      'position':'absolute',
      'display':'block',
      'left':400+offset,
      'top':200+offset,
      'z-index':zi
      }
    });
  
  el.setStyle('visibility','hidden');
  el.inject(ct,'top');
  
  el.set('load',{onSuccess: function(resp){
    var sz = el.getSize();
    alert(sz.x+' '+sz.y);

    el.setStyle('visibility','visible');
    offset += 30;
    zi ++;
  }});
  
  el.load(url);
};

// 
var ap_hookElementsIn = function(){
  var hk = new Hash(hooks);
  hk.each(function(val,key){
    $(key).addEvent(val[0],val[1]);
  });
};



hooks = 
{
  'ap_add_new_milestone':[ 'click', ap_showPartial.bind( null, [ '/milestones/new/?layout=naked' , null ] ) ]
};

window.addEvent('domready',function(){
  ap_hookElementsIn();
});
