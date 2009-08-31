
var partial_registry = {};
var hooks = {};

var offset = 0;
var zi = 0;

// here we load a div of some sort. When its done loading we run event handler
var ap_showPartial = function(url,container,focus_element){
  var ct = container;
  if(container == null)
    ct = $('container');
  
  var el = new Element('div',{
    'id':'ap_partial_'+zi.toString(),
    'styles':{
      'position':'absolute',
      'display':'block',
      'left':-500,
      'top':-500,
      'z-index':zi
      }
    });
  
  el.setStyle('visibility','hidden');
  el.inject(ct,'top');
  
  el.set('load',{onSuccess: function(resp){
    // drag handle bar
    var drag_el = new Element('div',{
        'styles':{
          'height':'40px',
          'width':'100px',
          'background-color':'gray',
          'visibility':'visible'
        }
      });

    var dg = new Drag(el,{'handle':drag_el});

    drag_el.inject(el,'top');

    var sz = el.getSize();
    el.setStyles({
        left: 500,
        top: -sz.y
    });
    
    el.setStyle('visibility','visible');
    var wsz = window.getSize();

    el.get('tween').start('top',[-sz.y,50+offset]).chain(function(){
      if(focus_element) $(focus_element).focus();
     });

    offset += 30;
    zi ++;
    ap_hookElementsIn();
  }});
  
  el.load(url);
};

var ap_submitAndClosePartial = function(event,url,partial_to_close){
    event.stop();
    alert('doot!');
};

var ap_hookElementsIn = function(){
  var hk = new Hash(hooks);
  hk.each(function(val,key){
    if($(key))
    $(key).addEvent(val[0],val[1]);
  });
};

hooks = 
{
  'ap_add_new_milestone':[ 'click', ap_showPartial.bind( null, [ '/milestones/new/?layout=naked' , 'container' ,'milestone_name'] ) ],
  'milestone_submit':['click',ap_submitAndClosePartial.bindWithEvent(null, ['/milestones',null] ) ]
};

window.addEvent('domready',function(){
  ap_hookElementsIn();
  DD_roundies.addRule('#ap_new_milestone','15px',true);
});
