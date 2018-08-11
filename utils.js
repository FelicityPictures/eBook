// Assumed positives
function leftBottomFront(desiredX, desiredY, desiredZ, width, height, depth){
    var outputX = desiredX + (width/2);
    var outputY = desiredY + (height/2);
    var outputZ = desiredZ + (depth/2);
    return [outputX, outputY, outputZ];
}

function rightBottomBack(desiredX, desiredY, desiredZ, width, height, depth){
    var outputX = desiredX - (width/2);
    var outputY = desiredY + (height/2);
    var outputZ = desiredZ + (depth/2);
    return [outputX, outputY, outputZ];
}
