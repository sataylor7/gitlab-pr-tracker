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
            'labels',
            {name: 'link', attr: 'href'}
        ],
        // Since there are no elements in the list, this will be used as template.
        item: generateCard()
    };

    var prList = new List('prs', options);

    $.get(mergeRequestURL, function(mergeRequestData, status){

        $.get(projectURL, function(projectData, projectStatus){
            let projectMap = new Map();

            for (let i = 0; i < projectData.length; i++) {
                projectMap.set(projectData[i].id, projectData[i].name_with_namespace)
            }

            for (let i = 0; i < mergeRequestData.length; i++) {
                console.log(mergeRequestData[i].web_url);

                prList.add({
                    project: transformBreadCrumbs(projectMap.get(mergeRequestData[i].project_id)),
                    title: mergeRequestData[i].title,
                    link: mergeRequestData[i].web_url,
                    author: mergeRequestData[i].author.name,
                    labels: transformLabels(mergeRequestData[i].labels)
                });
            }
        });
    })
});

function getUrlParameter(sParam) {
    const sPageURL = window.location.search.substring(1);
    const sURLVariables = sPageURL.split('&');

    for (let i = 0; i < sURLVariables.length; i++) {
        let sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
}

const transformBreadCrumbs = (str) => (
    '<h5><span class="badge badge-primary arrow-right">' +
        str.split('/').join('</span><span class="badge badge-primary arrow-right">') +
    '</span></h5>'
)

const cachedLabels = {};
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
const generateColor = (label) => {
    if (!cachedLabels[label]) {
        cachedLabels[label] = `rgb(${getRandomArbitrary(0, 255)}, ${getRandomArbitrary(0, 255)}, ${getRandomArbitrary(0, 255)})`;
    }
    return `background-color:${cachedLabels[label]};`
}

const transformLabels = (arr) => {
    const labels = arr.map((v) => `<span class="badge" style="${generateColor(v)}">${v}</span>`);
    return `<h6>${labels.join(' ')}</h6>`
}

const generateCard = () => (
    '<li>' +
        '<div class="card">' +
            '<div class="card-body">' +
                '<h4 class="card-title"><a class="link title"></a></h4>' +
                '<p class="card-text project"></p>' +
                '<div class="labels"></div>' +
                '<p class="card-text author"></p>' +
            '</div>' +
        '</div>' +
    '</li>'
)
