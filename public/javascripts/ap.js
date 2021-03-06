
var partial_registry = {};
var hooks = {};

var offset = 0;
var zi = 1;


var ap_showPartialSlideApart = function(ev,url,container,focus_element,submit_element)
{
  var ct = $(container);

  var to_hide = 'ap_partial_'+zi.toString();
  var div = new Element('div', {
      id: to_hide,
      styles:{
        height: 0,
        width:  700,
        overflow: 'hidden'
      }
    });
  
  zi++;
  
  div.inject(this,'after');
  div.set('load',{

    onSuccess: function(){
      var szF = div.getScrollSize();
      div.get('tween').start('height',[0,szF.y]);
      ap_hookElementsIn();
      
          // LOL ZOMFG :)
          var sel = $(submit_element);
          if( sel )
          {
            sel.set( 'to_hide', to_hide );
          };

    }
  });
  div.load(getval(url));
}

// here we load a div of some sort. When its done loading we run event handler
var ap_showPartial = function(ev,url,container,focus_element,submit_element){

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
        
  el.load(getval(url));
};
function getval(val){
  if(typeof(val) == 'function')
    return val();
  return val;
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

var ap_shrinkStory = function( form )
{
    $($('story_submit').get('to_hide')).tween('height',0);
}

var ap_copyMilestoneSubject = function(form)
{
    
    var newdiv = new Element('div',{
                              'class':'ap_project_milestone',
                              'styles':{
                                'display':'block'
                              }
                            });
    var check = new Element('input',{
                                'type':'checkbox',
                                'id':'ap_milestone_unknown',
                                'value':'yes',
                                'class':'ap_milestone_complete'});
    newdiv.set('text',form.milestone_name.value);
    check.inject(newdiv,'bottom');
    newdiv.inject($('ap_milestones_list'),'top');
};


// Hooks up elements to their function handelers
var ap_hookElementsIn = function()
{
  var hk = new Hash(hooks);
  hk.each(function(val,key){
    if(val[3])
    {// class based event handlers
      var i = 0;
      $$('.'+key).each(function(el){
        el.addEvent(val[0],val[1].bindWithEvent(el,val[2]) );
        l('class '+key.toString());
        i++;
      });
    }
    else
    {// id based event handlers

      if($(key))
        $(key).addEvent(val[0],val[1].bindWithEvent($(key),val[2]) );
    }
  });

  
  // here we will call handlers 
  ap_projectHookElementsIn(); // lol
  
};

var ap_milestoneCompleted = function(ev){
  ev.target.set('checked',false);
  (function(){ev.target.set('checked',true);}).delay(1000);
  (function(){ev.target.set('checked',false);}).delay(2000);
}


hooks = 
{
  'ap_add_new_milestone':[
                        'click',
                        ap_showPartial,
                          [
                            function(){return '/milestones/new/?layout=naked&milestone[project_id]='+project_id.toString()},
                            'container',
                            'milestone_name',
                            'milestone_submit'
                          ]
                        ],
  
  'ap_add_new_story':[
                        'click',
                        ap_showPartialSlideApart,
                          [
                            function(){return '/stories/new/?layout=naked&story[project_id]='+project_id.toString()},
                            'container',
                            'story_name',
                            'story_submit'
                          ],
                         true
                        ],


  'milestone_submit':[
                        'click',
                        ap_submitAndClosePartial,
                          [
                            '/milestones',
                            null,
                            'milestone_submit', 
                            ap_copyMilestoneSubject
                          ],
                        true
                     ], 
  'story_submit':[
                'click',
                 ap_submitAndClosePartial,
                          [
                            '/stories',
                            null,
                            'story_submit', 
                            ap_shrinkStory
                          ],
                    true
                  ],
  'ap_milestone_complete':[
                            'click', 
                            ap_milestoneCompleted,
                            [],
                            true
                          ]
};


// thats it, that how we deal with content sizing issue.
function ap_setSizeMetrics()
{
  var szS;
  $$('.ap_form').each(function(el)
  {
    var maxwidth = $('container').getSize().x-150;
    el.setStyle('background-color','#eee');
    szS = el.getScrollSize();
    if(szS.x > maxwidth) szS.x = maxwidth; // MAXWIDTH
    el.setStyles({
      width: szS.x,
      height: szS.y
    });
  });
}


window.addEvent('domready',function(){
  ap_setSizeMetrics();

  ap_hookElementsIn();
  DD_roundies.addRule('#ap_new_milestone','15px',true);
});


function l(msg)
{
  if(typeof(console) != 'undefined')
  {
    console.log(msg);
  }
}
