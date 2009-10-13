
var partial_registry = {};
var hooks = {};

var offset = 0;
var zi = 0;

// here we load a div of some sort. When its done loading we run event handler
var ap_showPartial = function(url,container,focus_element,submit_element){
  var ct = container;
  if(container == null)
    ct = $('container');
  
  var to_hide = 'ap_partial_'+zi.toString();
  var el = new Element('div',{
    'id':to_hide,
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
                position: 'absolute',
                'height':'40px',
                'width':'100px',
                'background':'transparent',
                'visibility':'visible'
              }
            });

          var close_el = new Element('div',{
            styles:{
              height:'32px',
              width:'32px',
              'background-color':'red',
              'float':'right'
            }
          });
          

          // hide the dialog
          close_el.inject(el,'top');
          close_el.addEvent('click',function(ev){
            ev.stop();
            el.setStyle('display','none');
            offset -= 30;
          }.bindWithEvent(this,[el]));

          var dg = new Drag(el,{'handle':drag_el});

          var esz = el.getSize();
          drag_el.setStyle('width',esz.x-32);

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

          var sel = $(submit_element);
          if( sel ){
            sel.set( 'to_hide', to_hide );
          };
        
          offset += 30;
          zi ++;
          ap_hookElementsIn();
        }});
        
  el.load(url);
};

// Sumbits the form hides the element... should update something?
var ap_submitAndClosePartial = function(event,url,partial_to_close,submit_element,callback)
{
    event.stop();
    if(callback)
    {
      callback($(submit_element).form);
    }

    $(submit_element).form.send();
    $($(submit_element).get('to_hide')).setStyle('display','none');
    
};

var ap_copyMilestoneSubject = function(form)
{
    
    var newdiv = new Element('div',{
                              'styles':{
                                'display':'block'
                              }
                            });
    newdiv.set('text',form.milestone_name.value);
    newdiv.inject($('ap_milestones_list'),'top');
};


// Hooks up elements to their function handelers
var ap_hookElementsIn = function()
{
  var hk = new Hash(hooks);
  hk.each(function(val,key){
    if($(key))
    $(key).addEvent(val[0],val[1]);
  });
};

hooks = 
{
  'ap_add_new_milestone':[
                        'click',
                        ap_showPartial.bind(
                            null,
                            [
                              '/milestones/new/?layout=naked',
                              'container',
                              'milestone_name',
                              'milestone_submit'
                            ]
                            
                         )
                        ],

  'milestone_submit':[
                        'click',
                        ap_submitAndClosePartial.bindWithEvent(
                                                null,
                                                [
                                                  '/milestones',
                                                  null,
                                                  'milestone_submit', 
                                                  ap_copyMilestoneSubject
                                                ]
                                              )
                     ]
};


// thats it, that how we deal with content sizing issue.
function ap_setSizeMetrics(){
  var szS;
  $$('ap_form').each(function(el){
    szS = el.getScrollSize();
    if(szS.x > 900) szS.x = 900;
    el.setSize(szS);
  });
}


window.addEvent('domready',function(){
  ap_setSizeMetrics();

  ap_hookElementsIn();
  DD_roundies.addRule('#ap_new_milestone','15px',true);
});

