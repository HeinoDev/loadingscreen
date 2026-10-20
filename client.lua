local joined = false
local Ready_msg = json.encode({ eventName = 'joinReady' })

exports('HasJoined', function()
    return joined
end)

RegisterNUICallback('join', function(_, cb)
    joined = true
    cb({})
end)

CreateThread(function()
    while not NetworkIsSessionStarted() do
        Wait(100)
    end

    while not joined do
        SendLoadingScreenMessage(Ready_msg)
        Wait(500)
    end
end)
