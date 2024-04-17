import React, { useEffect, useState } from 'react';
import "./App.css";
import ExitButton from "./ExitButton";
import RentButton from "./RentButton";
import SelectButton from "./SelectButton";
import NumberInput from "./input"
import Timer from "./Timer"
import { debugData } from "../utils/debugData";
import { fetchNui } from "../utils/fetchNui";
import { useNuiEvent } from "../hooks/useNuiEvent";


// This will set the NUI to visible if we are
// developing in the browser
debugData([
  {
    action: "setVisible",
    data: true,
  },
]);

interface CarInfo {
  Class: string;
  Brand: string;
  Model: string;
  Description: string;
  TopSpeed: number;
  Horsepower: number;
  Traction: number;
  image: string;
  price: number;
}


const App: React.FC = () => {

  const [carInfo, setCarInfo] = useState<CarInfo[]>([]);

  const handleExitClick = () => {
    setSelectedVariables(prevState => ({
      ...prevState,
      active: false,
    }));
    fetchNui("hideFrame");
  };


  const [showTimer, setShowTimer] = useState(false);

  const handleTimerComplete = () => {
    setShowTimer(false);
    fetchNui("hideFrame");
  };

  useNuiEvent('setShowTimer', (data: { showTimer: boolean }) => {
    setShowTimer(data.showTimer);
  });

  const handleRentButton = () => {
    selectedVariables.time = parseInt(numberValue, 10);
    fetchNui("rentCar", selectedVariables);
    setSelectedVariables(prevState => ({
      ...prevState,
      active: false,
    }));
    fetchNui("hideFrameForTimer");
    setShowTimer(true);
  };

  useEffect(() => {
    // Event listener to handle messages from Lua server
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;

      if (message.type === 'returnClientData') {
        const { carInfo } = message.data;
        setCarInfo(carInfo);
      }
    };

    // Add event listener when component mounts
    window.addEventListener('message', handleMessage);

    // Cleanup event listener when component unmounts
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  // Group carInfo by Class
  // Group carInfo by Class
  const groupedCarInfo = carInfo.reduce((acc, car) => {
    if (!acc[car.Class]) {
      acc[car.Class] = [];
    }
    acc[car.Class].push(car);
    return acc;
  }, {} as Record<string, CarInfo[]>); // Type assertion

  const [selectedVariables, setSelectedVariables] = useState({
    brand: 'Brand',
    model: 'Model',
    description: 'Description',
    topSpeed: 0,
    horsepower: 0,
    traction: 0,
    image: 'car.png',
    price: 0,
    active: false,
    time: 0,
  });

  const handleSelect = (selectedOption: {
    brand: string;
    model: string;
    description: string;
    topSpeed: number;
    horsepower: number;
    traction: number;
    image: string;
    price: number;
    active: boolean;
    time: number;
  }) => {
    setSelectedVariables(selectedOption);
  };

  const [numberValue, setNumberValue] = useState('');

  // ... (rest of the code)

  const handleNumberChange = (value: string) => {
    setNumberValue(value);
  };


  const womanImage = 'https://res.cloudinary.com/duzcxnh0t/image/upload/v1705266341/thjex6mlinuehfg0gni2.png';
  const customStyles = { padding: 12, width: 129 };

  return (
    <div className="nui-wrapper">
      {!showTimer && <div className="background">
        <div className="header-wrapper">
          <div className="headTexts">
            <div className="headTopText">VEHICLE RENT</div>
            <div className="headSubText">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit</div>
          </div>
          <div onClick={handleExitClick} style={{ marginLeft: '255px' }}>
            <ExitButton />
          </div>
          <div className="headLine"></div>
        </div>

        <div className="midContent">
          <div className="carList">


            <div className='classTitle'>CLASS A</div>
            {groupedCarInfo['ClassA'] && (
              <div className='classBox'>
                {groupedCarInfo['ClassA'].map((car, index) => (
                  <div className='classCarBox' key={index}>
                    <div className="carTitleBox">
                      <div className="CarBrand">{car.Brand}</div>
                      <div className="CarModel">{car.Model}</div>
                    </div>
                    <div style={customStyles}>
                      <SelectButton onSelect={handleSelect} selectedOption={{
                        brand: car.Brand,
                        model: car.Model,
                        description: car.Description,
                        topSpeed: car.TopSpeed,
                        horsepower: car.Horsepower,
                        traction: car.Traction,
                        image: car.image,
                        price: car.price,
                        active: true,
                        time: 0,
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className='classTitle'>CLASS B</div>
            {groupedCarInfo['ClassB'] && (
              <div className='classBox'>
                {groupedCarInfo['ClassB'].map((car, index) => (
                  <div className='classCarBox' key={index}>
                    <div className="carTitleBox">
                      <div className="CarBrand">{car.Brand}</div>
                      <div className="CarModel">{car.Model}</div>
                    </div>
                    <div style={customStyles}>
                      <SelectButton onSelect={handleSelect} selectedOption={{
                        brand: car.Brand,
                        model: car.Model,
                        description: car.Description,
                        topSpeed: car.TopSpeed,
                        horsepower: car.Horsepower,
                        traction: car.Traction,
                        image: car.image,
                        price: car.price,
                        active: true,
                        time: 0,
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className='classTitle'>CLASS C</div>
            {groupedCarInfo['ClassC'] && (
              <div className='classBox'>
                {groupedCarInfo['ClassC'].map((car, index) => (
                  <div className='classCarBox' key={index}>
                    <div className="carTitleBox">
                      <div className="CarBrand">{car.Brand}</div>
                      <div className="CarModel">{car.Model}</div>
                    </div>
                    <div style={customStyles}>
                      <SelectButton onSelect={handleSelect} selectedOption={{
                        brand: car.Brand,
                        model: car.Model,
                        description: car.Description,
                        topSpeed: car.TopSpeed,
                        horsepower: car.Horsepower,
                        traction: car.Traction,
                        image: car.image,
                        price: car.price,
                        active: true,
                        time: 0,
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            )}


          </div>
          <div style={selectedVariables.active ? { opacity: '1' } : { opacity: '0' }} className="carView">

            <div className="carTitle">
              <div className="carBrand">{selectedVariables.brand}</div>
              <div className="carModel">{selectedVariables.model}</div>
              <div className="carDescription">{selectedVariables.description}</div>
            </div>

            <div
              className='carImage'
              style={{
                background: `url('https://cfx-nui-ms-carrent/images/${selectedVariables.image}') lightgray 50% / cover no-repeat`,
              }}
            />
            <div
              className='carImage2'
              style={{
                background: `url('https://cfx-nui-ms-carrent/images/${selectedVariables.image}') lightgray 50% / cover no-repeat`,
              }}
            />
            <div
              className='carImage3'
              style={{
                background: `url('https://cfx-nui-ms-carrent/images/${selectedVariables.image}') lightgray 50% / cover no-repeat`,
              }}
            />

            <div className='carSpecs'>
              <div className="specsBox">
                <div className="specsTitle">MAX SPEED</div>
                <div className="specValue">{selectedVariables.topSpeed} KM/H</div>
              </div>

              <div className="specsBox">
                <div className="specsTitle">HORSER POWER</div>
                <div className="specValue">{selectedVariables.horsepower} hp</div>
              </div>

              <div className="specsBox">
                <div className="specsTitle">TRACTION</div>
                <div className="specValue">{selectedVariables.traction} sEC</div>
              </div>

            </div>

            <div className='bottomCar'>
              <div className="priceRent">{selectedVariables.price} $/min</div>
              <NumberInput onNumberChange={handleNumberChange} />
              <div onClick={handleRentButton}>
                <RentButton></RentButton>
              </div>

            </div>

          </div>
          <img src={womanImage} alt="???????" className='womanImage' />
        </div>

      </div>}
      {showTimer && <Timer initialSeconds={parseInt(numberValue, 10)*60} onComplete={handleTimerComplete} />}
    </div>
  );
};

export default App;
