console.log(
    '%cbuild from PakePlus： https://github.com/Sjj1024/PakePlus',
    'color:orangered;font-weight:bolder'
)

// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })


const { WebviewWindow } = window.__TAURI__.webviewWindow

const webview = new WebviewWindow('my-label', {
    url: 'https://pakeplus.com/',
    x: 500,
    y: 500,
    width: 800,
    height: 400,
    focus: true,
    title: 'PakePlus Window',
    alwaysOnTop: true,
    center: true,
    resizable: true,
    transparent: false,
    visible: true,
})
webview.once('tauri://created', function () {
    // webview successfully created
    console.log('new webview created')
})
webview.once('tauri://error', function (e) {
    // an error happened creating the webview
    console.log('new webview error', e)
})