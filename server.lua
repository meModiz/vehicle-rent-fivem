RegisterNetEvent('carSpawn')
AddEventHandler('carSpawn', function(data, openedShopedID, playerID)
  local model = data.model                                     -- Model can be either a string or a hash
  local coords = Config.Rent[openedShopedID].carcoords        -- Coords Can either be vector or a table (such as {x = 0, y = 0, z = 0})
  local Heading = 0                                            -- Sets the Rotation/Heading the vehicle spawns at, can be any number
  local Properties = { plate = 'RENT' }                  -- Sets the vehicle Properties, set to nil or {} for no properties to be set
  ESX.OneSync.SpawnVehicle(model, coords, Heading, Properties, function(NetworkId)
    Wait(100)                                                  -- While not needed, it is best to wait a few milliseconds to ensure the vehicle is available
    local Vehicle = NetworkGetEntityFromNetworkId(NetworkId)   -- returns the vehicle handle, from the NetworkId.
    -- NetworkId is sent over, since then it can also be sent to a client for them to use, vehicle handles cannot.
    local Exists = DoesEntityExist(Vehicle)                    -- returns true/false depending on if the vehicle exists.
    print(Exists and 'Successfully Spawned Vehicle!' or 'Failed to Spawn Vehicle!')
    Player(playerID).state.rentedCarID = Vehicle
  end)
end)

RegisterNetEvent('carRemove')
AddEventHandler('carRemove', function(playerID)
  if DoesEntityExist(Player(playerID).state.rentedCarID) then
    DeleteEntity(Player(playerID).state.rentedCarID)
    Player(playerID).state.rentedCarID = nil
  else
    Player(playerID).state.rentedCarID = nil
  end
end)


ESX.RegisterServerCallback('ms-pay', function(source, cb, price, type)
  local xPlayer = ESX.GetPlayerFromId(source)
  local price = tonumber(price)
  if type == "cash" then
      if xPlayer.getMoney() >= price then
          xPlayer.removeMoney(price)
          cb(true)
      else
          cb(false)
          return
      end
  elseif type == 'bank' then
    if xPlayer.getAccount('bank').money >= price then
      xPlayer.removeAccountMoney('bank', price)
      cb(true)
    else
      cb(false)
    end
  end
end)