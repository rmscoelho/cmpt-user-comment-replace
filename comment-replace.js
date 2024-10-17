// ==UserScript==
// @name         CMPT User Comment Replace
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  substituir comentários de certos users por factos aleatórios
// @author       rcoelho14
// @match        https://www.cmportugal.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=cmportugal.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const userList = ['Sima01']
    const getComment = document.querySelectorAll('article.ipsComment > aside.ipsComment_author > h3 > strong > a')
    const getQuote = document.querySelectorAll('blockquote');

    //Escolha entre: facts/aleixo/renato/senhorPe/beatriz/inspirational/jokes/biblia/memes
    const quoteType = 'facts'

    // Replace comments from user with random facts
    getComment.forEach((element) => {
        let commentParent = element.parentElement.parentElement.parentElement.parentElement;
        userList.forEach(user => {
            if (element.text === user) {
                commentParent.getElementsByClassName('ipsType_richText')[0].innerHTML = randomFacts(quoteType)
            }
        })
    })

    // Replace quoted comments from user with random facts
    getQuote.forEach(element => {
        userList.forEach(user => {
            if (element.getElementsByClassName('ipsQuote_citation')[0].innerHTML.indexOf(user) !== -1) {
                let citationContent = element.children[1];
                citationContent.innerHTML = randomFacts(quoteType)
            }
        })
    })
})();

async function randomFacts(quoteType = 'facts') {
    const url = "https://raw.githubusercontent.com/rmscoelho/cmpt-user-comment-replace/refs/heads/master/replacementText.json";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json[quoteType]);

        if (json[quoteType] === 'memes') {
            return
            `<img src=${json[quoteType][Math.floor((Math.random() * data.length))]}>`
            ;
        } else {
            return "<p>\t&#127775; " + json[quoteType][Math.floor((Math.random() * data.length))] + " \t&#127775;</p>"
        }

    } catch (error) {
        console.error(error.message);
    }
}