(function(){

    var resetButton = document.getElementById('reset');
    var lineButton = document.getElementById('line');
    var freeButton = document.getElementById('freehand');
    var rectButton = document.getElementById('rect');

    resetButton.addEventListener('click', function(){
        anno.reset();
    });

    lineButton.addEventListener('click', function(){
        anno.addPlugin('PolygonSelector', { 
            activate: true
        });
    });

    freeButton.addEventListener('click', function(){
        anno.addPlugin('FreehandSelector', { 
            activate: true
        });
    });

    rectButton.addEventListener('click', function(){
        anno.addPlugin('PolygonSelector', { activate: false });
        anno.addPlugin('FreehandSelector', { activate: false });
    });


    anno.setProperties({
        outline: 'red'
    });
    
    anno.makeAnnotatable(document.getElementById('myImage'));

}());