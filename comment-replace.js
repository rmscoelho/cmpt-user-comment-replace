// ==UserScript==
// @name         CMPT User Comment Replace
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  substituir comentários de certos users por factos aleatórios
// @author       rcoelho14
// @match        https://www.cmportugal.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=cmportugal.com
// @grant        GM_addElement
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(async function () {
    'use strict';

    const userList = ['Sima01', 'Santon', 'AVB2024', 'Bug', 'Tibraco']
    const getComment = document.querySelectorAll('article.ipsComment > aside.ipsComment_author > h3 > strong > a')
    const getQuote = document.querySelectorAll('blockquote');

    //Escolha entre: facts/aleixo/renato/senhorPe/beatriz/inspirational/jokes/biblia/memes/capybaraFacts/capybaraImages
    const quoteType = 'capybaraImages'

    console.log(await randomFacts(quoteType))

    // Replace comments from user with random facts
    for (const element of getComment) {
        let commentParent = element.parentElement.parentElement.parentElement.parentElement;
        for (const user of userList) {
            if (element.text === user) {
                let fact = await randomFacts(quoteType);
                commentParent.getElementsByClassName('ipsType_richText')[0].innerHTML = (quoteType === 'memes') ? "<img src='" + fact + "'/>" : "<p>\t&#127775; " + fact + " \t&#127775;</p>"
            }
        }
    }

    // Replace quoted comments from user with random facts
    for (const element of getQuote) {
        for (const user of userList) {
            if (element.getElementsByClassName('ipsQuote_citation')[0].innerHTML.indexOf(user) !== -1) {
                let citationContent = element.children[1];
                let fact = await randomFacts(quoteType);
                citationContent.innerHTML = (quoteType === 'memes') ? "<img src='" + fact + "'/>" : "<p>\t&#127775; " + fact + " \t&#127775;</p>"
            }
        }
    }
})();

async function randomFacts(quoteType = 'memes') {
    const url = "https://raw.githubusercontent.com/rmscoelho/cmpt-user-comment-replace/refs/heads/master/replacementText.json";

    const getRequest = await GM.xmlHttpRequest({url: url}).catch(e => console.error(e));
    let response = JSON.parse(getRequest.responseText);

    return response[quoteType][Math.floor((Math.random() * response[quoteType].length))]

}