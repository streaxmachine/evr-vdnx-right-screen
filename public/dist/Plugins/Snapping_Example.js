TouchFree.Connection.ConnectionManager.init();

window.onload = function () {
    var cursorRing = document.createElement('img');
    cursorRing.src = './images/leap/Ring.png';
    cursorRing.style.position = 'fixed';
    cursorRing.width = 30;
    cursorRing.height = 30;
    cursorRing.style.zIndex = '1000';

    var cursor = document.createElement('img');
    cursor.src = "/images/leap/Dot.png";
    cursor.style.position = 'fixed';
    cursor.width = 30;
    cursor.height = 30;
    cursor.style.zIndex = '1001';

    // This is a special class used by the WebInputController to identify the html elements that
    // make up the cursor. This is so it can ignore cursor-related objects when it is looking
    // for elements to pointerover/pointerout etc.
    cursor.classList.add('touchfreecursor');
    cursorRing.classList.add('touchfreecursor');

    document.body.appendChild(cursor);
    document.body.appendChild(cursorRing);

    new TouchFree.Cursors.DotCursor(cursor, cursorRing);
    new TouchFree.InputControllers.WebInputController();
};
