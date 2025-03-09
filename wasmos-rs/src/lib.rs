mod utils;

use evalexpr::*;
use wasm_bindgen::prelude::*;
use web_sys::console;

#[wasm_bindgen]
pub struct Coordinate {
    x: f64,
    y: f64,
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

fn do_the_math(equation: &str) -> Result<Vec<Coordinate>, EvalexprError> {
    let operator_tree = evalexpr::build_operator_tree(equation)?;

    let mut the_math: Vec<Coordinate> = Vec::new();
    for x in 0..100 {
        let context = context_map! { "x" => int x }?;
        let y = operator_tree.eval_float_with_context(&context)?;
        the_math.push(Coordinate { x: x as f64, y });
    }

    Ok(the_math)
}

#[wasm_bindgen]
pub fn compute(equation: &str) -> Vec<Coordinate> {
    match do_the_math(equation) {
        Ok(points) => points,
        Err(error) => {
            console::log_1(&error.to_string().into());
            Vec::new()
        }
    }
}
