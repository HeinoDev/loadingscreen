fx_version 'cerulean'
game 'gta5'
lua54 'yes'

author 'Heino'

loadscreen 'web/dist/index.html'
loadscreen_manual_shutdown 'yes'
loadscreen_cursor 'no'

client_script 'client.lua'

files {
    'web/dist/**/*',
}

exports { 'HasJoined' }
