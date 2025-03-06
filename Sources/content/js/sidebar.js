function openNav(){
    document.getElementById("sidebar").style.transition = "0.5s";
    if(window.innerWidth < 768){
        document.getElementById("sidebar").style.width = "100%";
    }else{
        document.getElementById("sidebar").style.width = "17%";
    }
    document.getElementById("main").style.display = "none";
    if(window.innerWidth < 768){
        document.getElementById("frame").style.width = "100%";
    }else{
        document.getElementById("frame").style.width = "83%";
    }
    document.getElementById("sdb").style.display = "block";
    document.getElementById("footer").style.float = "left";
    document.getElementById("footer").style.width = "100%";
}
function closeNav(){
    document.getElementById("sidebar").style.transition = "none";
    document.getElementById("sidebar").style.width = "0";
    document.getElementById("main").style.display = "inline-block";
    document.getElementById("frame").style.width = "97.5%";
    document.getElementById("frame").style.float = "right";
    document.getElementById("frame").style.transition = "0.5s";
    document.getElementById("sdb").style.display = "none";
}
document.addEventListener("DOMContentLoaded", function() {
    var links = document.querySelectorAll('.open-modal');
    var targetIframe = document.getElementById('frame');  
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();  
            var targetFrameDoc = targetIframe.contentDocument || targetIframe.contentWindow.document;
            var modalContainer = targetFrameDoc.getElementById('modal-container');
            
            if (modalContainer) {
                modalContainer.style.display = 'block';  
            }
            setTimeout(function() {
                var anchor = link.getAttribute('href'); 
                targetFrameDoc.location.hash = anchor;
            }, 300); 
        });
    });
});