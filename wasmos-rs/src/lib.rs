mod coordinate;
mod utils;

use wasm_bindgen::prelude::wasm_bindgen;
use web_sys::console;

use crate::coordinate::Coordinate;

const GRAPH_RESOLUTION: usize = 100;

fn do_the_math(equation: &str) -> Result<Vec<Coordinate>, evalexpr::EvalexprError> {
    let operator_tree = evalexpr::build_operator_tree(equation)?;

    let mut the_math: Vec<Coordinate> = Vec::new();

    // We are not actually truncating anything here as WASM is 32-bit.
    #[allow(clippy::cast_possible_truncation, clippy::cast_possible_wrap)]
    let upper_limit = GRAPH_RESOLUTION as i32 / 2;

    for x in -upper_limit..upper_limit {
        let context = evalexpr::context_map! { "x" => int x }?;
        let y = operator_tree.eval_number_with_context(&context)?;
        the_math.push(Coordinate { x: f64::from(x), y });
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

