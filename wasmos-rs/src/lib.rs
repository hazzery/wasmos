mod coordinate;
mod utils;

use wasm_bindgen::prelude::wasm_bindgen;
use web_sys::console;

use crate::coordinate::Coordinate;

const GRAPH_RESOLUTION: usize = 100;

/// Evaluate the given string expression over the fixed range of [-50, 50].
///
/// Builds an operator tree from the expression, and computes its value for each
/// value of $x$ from -50 to 50.
///
/// Returns a vector of (x, y) pairs if the expression parsing was successful,
/// an error containing more information is returned otherwise.
fn evaluate_expression(equation: &str) -> Result<Vec<Coordinate>, evalexpr::EvalexprError> {
    let operator_tree = evalexpr::build_operator_tree(equation)?;

    let mut coordinates: Vec<Coordinate> = Vec::new();

    // We are not actually truncating anything here as WASM is 32-bit.
    #[allow(clippy::cast_possible_truncation, clippy::cast_possible_wrap)]
    let graph_upper_limit = GRAPH_RESOLUTION as i32 / 2;

    for x in -graph_upper_limit..graph_upper_limit {
        let context = evalexpr::context_map! { "x" => int x }?;
        let y = operator_tree.eval_number_with_context(&context)?;
        coordinates.push(Coordinate { x: f64::from(x), y });
    }

    Ok(coordinates)
}

/// Evaluate an expression given by JavaScript, and return result back to
/// JavaScript.
///
/// If parsing of string expression is unsuccessful, an error message is logged
/// to the web console, and an empty vector is returned.
#[wasm_bindgen]
pub fn parse_and_evaluate(expression: &str) -> Vec<Coordinate> {
    match evaluate_expression(expression) {
        Ok(coordinates) => coordinates,
        Err(error) => {
            console::log_1(&error.to_string().into());
            Vec::new()
        }
    }
}
