let _ = require('lodash')
let Nightmare = require('nightmare');
require('nightmare-iframe-manager')(Nightmare);
let nightmare = Nightmare({
    show: true,
    typeInterval: 100,
    openDevTools: {
        mode: 'detach'
    }
});

let mail;
let webSiteName;
let password = 'Zumba123'

nightmare
    .goto('https://tempail.com/')
    .evaluate(() => {
        mail = document.querySelector('#eposta_adres').value
        return mail
    })
    .then(mail => {
        let a = _.split(mail, '@');
        webSiteName = a[0];
        return nightmare.goto('https://wordpress.com/start/website/design-type/fr?ref=homepage')
            .click('.design-type__choice-link :nth-child(2)')
            .wait(200)
            .click('.theme__active-focus:first-child')
            .wait(200)
            .type('#search-component-1', webSiteName)
            .wait(3000)
            .click('.domain-suggestion:first-child')
            .wait(200)
            .click('.button.is-free-plan:first-child')
            .wait(200)
            .type('#email', mail)
            .type('#username', webSiteName)
            .type('#password', password)
            .wait(200)
            .click('button')
            .wait(6000)
            .click('button')
            .evaluate(() => {
                return "ah"
            })
            .then(() => {
                return nightmare.goto('https://tempail.com/')
                    .wait(15000)
                    .click('.mail a')
                    .wait(1000)
                    .enterIFrame('#iframe')
                    .evaluate(() => {
                        let url = document.querySelector('table a').href;
                        return url
                    })
                    .then(url => {
                        return nightmare.goto(url)
                            .type('#user_login', webSiteName)
                            .type('#user_pass', password)
                            .click('#wp-submit')
                            .evaluate(() => {

                            })
                            .then(() => {
                                return nightmare.goto('https://wordpress.com/post/' + webSiteName + '.wordpress.com')
                                    .evaluate(() => {

                                    })
                            })
                    })
            })
    })



