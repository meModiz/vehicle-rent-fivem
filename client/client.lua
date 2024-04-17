---@diagnostic disable: undefined-global
local openedShopedID
local function hideNuiFrame()
  SetNuiFocus(false, false)
  SendReactMessage('setVisible', false)
  debugPrint('Hide NUI frame')
end


local function toggleNuiFrame(shouldShow)
  SetNuiFocus(shouldShow, shouldShow)
  SendReactMessage('setVisible', shouldShow)

  if shouldShow then
    local dataToSend 
    -- New table to store car information
    local carInfoTable = {}

    -- Iterate over each class
    for class, cars in pairs(carsConfig) do
      -- Iterate over each car in the class
      for _, car in ipairs(cars) do
        -- Create a new table for each car and add it to the carInfoTable
        local carInfo = {
          Class = class,
          Brand = car.carBrand,
          Model = car.carModel,
          Description = car.carDescription,
          TopSpeed = car.carTopSpeed,
          Horsepower = car.carHorserPower,
          Traction = car.carTraction,
          image = car.image,
          price = car.price,
        }
        table.insert(carInfoTable, carInfo)
      end
    end

    dataToSend = {
      carInfo = carInfoTable
    }
    SendNUIMessage({
      type = 'returnClientData',
      data = dataToSend
    })
    debugPrint('Sending data to the client when showing NUI frame')
  else
    hideNuiFrame()
  end
end


RegisterCommand('show-nui', function()
  toggleNuiFrame(true)
  debugPrint('Show NUI frame')
end)

RegisterNUICallback('hideFrame', function(_, cb)
  hideNuiFrame()
  cb({})
end)

RegisterNUICallback('hideFrameForTimer', function(_, cb)
  SetNuiFocus(false, false)
  cb({})
end)

RegisterNUICallback('rentCar', function(data, cb)
    local playerID = GetPlayerServerId(PlayerId())
    StartTimer(data, openedShopedID, playerID)
end)

function StartTimer(data, openedShopedID, playerID)
  local rentalPrice = data.price*data.time
  ESX.TriggerServerCallback('ms-pay', function(callback)
    if(callback) then
      TriggerServerEvent('carSpawn', data, openedShopedID,playerID)

      local earlySpawnTimer = tonumber(data.time)*60
      CreateThread(function()
        -- early respawn timer
        while earlySpawnTimer > 0 do
          Wait(1000)
          if earlySpawnTimer > 0 then
            earlySpawnTimer = earlySpawnTimer - 1
            --print('Liko nuomos laiko: ' .. earlySpawnTimer .. ' sekundžių.')
          end
        end
        if(earlySpawnTimer <= 0) then
            TriggerServerEvent('carRemove', playerID)
        end
      end)
    else
      hideNuiFrame()
      SendReactMessage('setShowTimer', false)
    end
  end, rentalPrice, Config.PaymentMethod)
end

Citizen.CreateThread(function()
  for k, v in pairs(Config.Rent) do
      local modelHash = GetHashKey("a_m_y_indian_01")
      RequestModel(modelHash)
      while not HasModelLoaded(modelHash) do
          Wait(10)
      end
      local ped = CreatePed(0, modelHash, v.pedcoords.x, v.pedcoords.y, v.pedcoords.z, v.pedheading, true, true)
      FreezeEntityPosition(ped, true)
      SetEntityAsMissionEntity(ped, true, true)
      SetEntityInvincible(ped, true)
      local playerID = GetPlayerServerId(PlayerId())
      exports['ox_target']:addLocalEntity(ped, {
          {
              onSelect = function()
              if(LocalPlayer.state.rentedCarID == nil) then
                  toggleNuiFrame(true)
                  openedShopedID = k
              else
                print('you have car')
              end
              end,
              icon = 'fa-solid fa-car',
              label = "Rent a car",
              data = v,
              canInteract = function(entity)
                  return #(GetEntityCoords(PlayerPedId()) - GetEntityCoords(entity)) <= 3.0
              end
          },
          {
            onSelect = function()
            if(LocalPlayer.state.rentedCarID == nil) then
              print('no car')
            else
              TriggerServerEvent('carRemove', playerID)
              hideNuiFrame()
              SendReactMessage('setShowTimer', false)
            end
            end,
            icon = 'fa-solid fa-hammer',
            label = "Destroy rent car [NO REFUND]",
            data = v,
            canInteract = function(entity)
                return #(GetEntityCoords(PlayerPedId()) - GetEntityCoords(entity)) <= 3.0
            end
        },
      })
  end
end)

Citizen.CreateThread(function()
	for k, v in pairs(Config.Rent) do
        if v and v.blip then
		    local blip = AddBlipForCoord(v.pedcoords)
		    SetBlipSprite(blip, v.blip.sprite)
		    SetBlipDisplay(blip, v.blip.display)
		    SetBlipScale(blip, v.blip.scale)
		    SetBlipColour(blip, v.blip.color)
		    SetBlipAsShortRange(blip, true)
		    BeginTextCommandSetBlipName("STRING")
		    AddTextComponentString(v.blip.name)
		    EndTextCommandSetBlipName(blip)
        end
	end
end)