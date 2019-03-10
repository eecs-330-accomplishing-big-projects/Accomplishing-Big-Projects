Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function buildHeading(project){
    var projectname = document.createElement("h6");
    projectname.setAttribute("class", "m-0 font-weight-bold text-primary");
    var project_title = document.createTextNode(project.title);
    var project_subtasks = project.subtasks.length;
    var completed = 0;
    var total_hours = 0;
    var i;
    for (i = 0; i < project.subtasks.length; i++) {
        if (project.subtasks[i].flag === true){
            completed += project.subtasks[i].time;
            total_hours += project.subtasks[i].time; 
        }
        else{
            total_hours += project.subtasks[i].time;
        }
    }
        
    var span_element = document.createElement("span");
    span_element.setAttribute("class","float-right");
    var completion_value = document.createTextNode(Math.round((completed*100/total_hours)).toString().concat("%"));
    span_element.appendChild(completion_value);
    projectname.appendChild(project_title);
    projectname.appendChild(span_element);

    return projectname;
}


function drawProgressBar(project){
    progressbardiv = document.createElement("div");
    progressbardiv.setAttribute("class","progress mb-4");
    
    var project_subtasks = project.subtasks.length;
    var completed = 0;
    var total_hours = 0;
    var i;
    for (i = 0; i < project.subtasks.length; i++) {
        if (project.subtasks[i].flag === true){
            completed += project.subtasks[i].time;
            total_hours += project.subtasks[i].time;
        }
        else{
            total_hours += project.subtasks[i].time;
        }
    }
    
    var percentage = Math.round((completed*100/total_hours));
    console.log(percentage);
    var actualprogressbar = document.createElement("div");
    
    if(percentage <= 20){
        actualprogressbar.setAttribute("class","progress-bar bg-danger");
    }
    else if (percentage <= 40){
        actualprogressbar.setAttribute("class","progress-bar bg-warning");  
    }
    else if (percentage <= 60){
        actualprogressbar.setAttribute("class","progress-bar"); 
    }
    else if(percentage <=80){
        actualprogressbar.setAttribute("class","progress-bar bg-info"); 
    }
    else{
        actualprogressbar.setAttribute("class","progress-bar bg-success"); 
    }
    
    actualprogressbar.setAttribute("role","progressbar");
    actualprogressbar.setAttribute("style",("width: ".concat(percentage.toString())).concat("%"));
    actualprogressbar.setAttribute("aria-valuenow",percentage.toString());
    actualprogressbar.setAttribute("aria-valuemin",(0).toString());
    actualprogressbar.setAttribute("aria-valuemax",(100).toString());
    progressbardiv.appendChild(actualprogressbar);
    return progressbardiv;
}

function init() {
    var el = document.getElementById("MyName"), username = window.localStorage.getItem("CurrentUser"), userData = JSON.parse(window.localStorage.getItem(username)), firstname = userData.firstName;
    el.innerHTML = firstname;
    
    if (userData.projects.length > 0) {
        var heading = document.createElement("h1"), t = document.createTextNode("Project Tracking");
        heading.setAttribute("class", "h3 mb-0 text-gray-800");
        heading.appendChild(t);
        var active_projects = document.getElementById("ActiveProjects");
        var active_projects_heading = document.getElementById("ActiveProjectsHeading");
        active_projects_heading.appendChild(heading);
        
        var card = document.createElement("div");
        card.setAttribute("class", "card shadow mb-4");
        card.setAttribute("style","width: 26rem;");
        var header = document.createElement("div");
        header.setAttribute("class", "card-header py-3");
        var title = document.createElement("h6");
        title.setAttribute("class", "m-0 font-weight-bold text-primary");
        var cardtitle = document.createTextNode("Progress on projects");
        title.appendChild(cardtitle);
        header.appendChild(title);
        card.appendChild(header);
        active_projects.appendChild(card);
        
        var cardbody = document.createElement("div");
        cardbody.setAttribute("class", "card-body");
        
        var x;
        
        for(x = 0; x < userData.projects.length; x++){
            var headingToBeAdded = buildHeading (userData.projects[x]);
            var childToBeAdded = drawProgressBar(userData.projects[x]);
            
            cardbody.appendChild(headingToBeAdded);
            cardbody.appendChild(childToBeAdded);
        }
        
        card.appendChild(cardbody);
        
        var piecard = document.createElement("div");
        piecard.setAttribute("class","card shadow mb-4");
        piecard.setAttribute("style","width: 26rem;");
        var pieheader = document.createElement("div");
        pieheader.setAttribute("class","card-header py-3 d-flex flex-row align-items-center justify-content-between");
        var pietitle = document.createElement("h6");
        pietitle.setAttribute("class","m-0 font-weight-bold text-primary");
        var pietitletext = document.createTextNode("Projects to date");
        pietitle.appendChild(pietitletext);
        pieheader.appendChild(pietitle);
        piecard.appendChild(pieheader);
        
        var piebody = document.createElement("div");
        piebody.setAttribute("class","card-body");
        
        var canvas = document.createElement("div");
        canvas.setAttribute("class","chart-pie pt-4 pb-2");
        var chart_canvas = document.createElement("canvas");
        chart_canvas.setAttribute("id","projectspiechart");
        canvas.appendChild(chart_canvas);
        piebody.appendChild(canvas);
        piecard.appendChild(piebody);
        active_projects.appendChild(document.createTextNode("\u00A0\u00A0\u00A0\u00A0"));
        active_projects.appendChild(piecard);
        
//        var pietags = document.createElement("div");
//        pietags.setAttribute("class","mt-4 text-center small");
//        var span1 = document.createElement("span"), span2 = document.createElement("span"), span3 = document.createElement("span");
//        span1.setAttribute("class","mr-2");
//        span2.setAttribute("class","mr-2");
//        span3.setAttribute("class","mr-2");
        
        var ctx = document.getElementById("projectspiechart");
        
        total_projects = userData.projects.length;
        
        var completed = 0, on_track = 0, not_started = 0;
        
        console.log(userData);
        debugger;
        
        for(x = 0; x < total_projects; x++) {
            var count = 0;
            for(var z = 0; z <userData.projects[x].subtasks.length; z++){
                if(userData.projects[x].subtasks[z].flag === true){
                    count += 1;
                }
            }
                
                if(count === 0){
                    not_started += 1;
                }
                else if(count ===userData.projects[x].subtasks.length){
                    completed += 1;
                }
                else{
                    on_track += 1;
                }
            }
            
        
        
        var myPieChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
            labels: ["In progress", "Completed", "Not Started"],
            datasets: [{
            data: [on_track, completed, not_started],
            backgroundColor: ['#4e73df', '#1cc88a', '#ea4335'],
            hoverBackgroundColor: ['#2e59d9', '#17a673', '#e12717'],
            hoverBorderColor: "rgba(234, 236, 244, 1)",
                        }],
            },
        options: {
            maintainAspectRatio: false,
            
            tooltips: {
        backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
        display: true,
        position: 'bottom',
        labels:{
            boxWidth: 15,
        },
    },
    cutoutPercentage: 0,
  },
});
        
        var piecard2 = document.createElement("div");
        piecard2.setAttribute("class","card shadow mb-4");
        piecard2.setAttribute("style","width: 26rem;");
        var pieheader2 = document.createElement("div");
        pieheader2.setAttribute("class","card-header py-3 d-flex flex-row align-items-center justify-content-between");
        var pietitle2 = document.createElement("h6");
        pietitle2.setAttribute("class","m-0 font-weight-bold text-primary");
        
        //TO DO: Update card title
        var pietitletext2 = document.createTextNode("XYZ");
        pietitle2.appendChild(pietitletext2);
        pieheader2.appendChild(pietitle2);
        piecard2.appendChild(pieheader2);
        
        var piebody2 = document.createElement("div");
        piebody2.setAttribute("class","card-body");
        
        var canvas2 = document.createElement("div");
        canvas2.setAttribute("class","chart-pie pt-4 pb-2");
        var chart_canvas2 = document.createElement("canvas");
        chart_canvas2.setAttribute("id","projectspiechart2");
        canvas2.appendChild(chart_canvas2);
        piebody2.appendChild(canvas2);
        piecard2.appendChild(piebody2);
        active_projects.appendChild(document.createTextNode("\u00A0\u00A0\u00A0\u00A0"));
        active_projects.appendChild(piecard2);
        
        var ctx2 = document.getElementById("projectspiechart2");
        
        var myPieChart2 = new Chart(ctx2, {
                type: 'doughnut',
                data: {
            labels: ["In progress", "Completed", "Not Started"],
            datasets: [{
            data: [on_track, completed, not_started],
            backgroundColor: ['#4e73df', '#1cc88a', '#ea4335'],
            hoverBackgroundColor: ['#2e59d9', '#17a673', '#e12717'],
            hoverBorderColor: "rgba(234, 236, 244, 1)",
                        }],
            },
        options: {
            maintainAspectRatio: false,
            
            tooltips: {
        backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
        display: true,
        position: 'bottom',
        labels:{
            boxWidth: 15,
        },
    },
    cutoutPercentage: 0,
  },
});

        
        
        
    }
}

init()