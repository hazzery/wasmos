use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
pub struct Coordinate {
    pub x: f64,
    pub y: f64,
}

#[wasm_bindgen]
impl Coordinate {
    #[wasm_bindgen(constructor)]
    pub fn new(x: f64, y: f64) -> Coordinate {
        Coordinate { x, y }
    }

    #[wasm_bindgen(getter)]
    pub fn x(&self) -> f64 {
        self.x
    }

    #[wasm_bindgen(getter)]
    pub fn y(&self) -> f64 {
        self.y
    }
}
