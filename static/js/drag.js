function Drag(father, child, callback) {
    var offsetX, offsetY,left,top;
    child.onmousedown = function (evt)                   
    {
        var oEvent = evt || window.event;              

        offsetX = oEvent.clientX - child.offsetLeft;
        offsetY = oEvent.clientY - child.offsetTop;

        if (child.setCapture)                            
        {
            document.onmousemove = moveFn;
            document.onmouseup = upFn;

            child.setCapture();                        

            return false;                                  
        } else                                           
        {
            document.onmousemove = moveFn;               
            document.onmouseup = upFn;
        }

        function moveFn(evt)                
        {
            var oEvent = evt || window.event;
            left = oEvent.clientX - offsetX;           
            top = oEvent.clientY - offsetY;

            var l1 = father.offsetWidth - child.offsetWidth;      
            var t1 = father.offsetHeight - child.offsetHeight;
            if (left > l1) {
                left = l1;
            }
            if (left < 0) {
                left = 0;
            }
            if (top > t1) {
                top = t1;
            }
            if (top < 0) {
                t = 0;
            }

            child.style.left = left + 'px';
            child.style.top = top + 'px';
        }

        function upFn() {
            this.onmousedown = null;
            this.onmousemove = null;
            if (typeof callback == "function") {
                callback((parseInt(left) || 0), (parseInt(top) || 0));
            }
            if (child.releaseCapture)                                 
            {
                child.releaseCapture();
            }
        }

        return false;                                             
    };
}