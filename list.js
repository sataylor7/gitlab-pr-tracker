$(document).ready(function(){
    var privateToken = getUrlParameter('private_token')

    const mergeRequestURL = 'https://gitlab.hallmarklabs.com/api/v4/merge_requests?per_page=50&private_token=' +
        privateToken +
        '&state=opened&scope=all';

    const projectURL = 'https://gitlab.hallmarklabs.com/api/v4/projects?per_page=1000&private_token=' +
        privateToken;

    var options = {
        valueNames: [
            'project',
            'author',
            'title',
            {name: 'link', attr: 'href'}
        ],
        // Since there are no elements in the list, this will be used as template.
        item: '<li>' +
            '<a class="link title"></a>' +
            '<p class="project"></p>' +
            '<p class="author"></p>' +
            '</li>'
    };

    var prList = new List('prs', options);

    $.get(mergeRequestURL, function(mergeRequestData, status){

        $.get(projectURL, function(projectData, projectStatus){
            let i;
            let projectMap = new Map();

            for (i = 0; i < projectData.length; i++) {
                projectMap.set(projectData[i].id, projectData[i].name_with_namespace)
            }

            for (i = 0; i < mergeRequestData.length; i++) {
                console.log(mergeRequestData[i].web_url);

                prList.add({
                    project: projectMap.get(mergeRequestData[i].project_id),
                    title: mergeRequestData[i].title,
                    link: mergeRequestData[i].web_url,
                    author: mergeRequestData[i].author.name
                });
            }
        });
    })
});

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
}