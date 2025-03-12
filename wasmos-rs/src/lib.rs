mod coordinate;
mod utils;

use rapier2d_f64::prelude::{
    CCDSolver, ColliderBuilder, ColliderSet, DefaultBroadPhase, ImpulseJointSet,
    IntegrationParameters, IslandManager, MultibodyJointSet, NarrowPhase, PhysicsPipeline,
    QueryPipeline, RigidBodyBuilder, RigidBodySet,
};
use wasm_bindgen::prelude::wasm_bindgen;
use web_sys::console;

use crate::coordinate::Coordinate;

const GRAPH_RESOLUTION: usize = 100;

fn do_the_math(equation: &str) -> Result<Vec<Coordinate>, evalexpr::EvalexprError> {
    let operator_tree = evalexpr::build_operator_tree(equation)?;

    let mut the_math: Vec<Coordinate> = Vec::new();

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
pub fn get_ball_spawn_coordinates() -> Coordinate {
    #[allow(clippy::cast_precision_loss)]
    let upper_limit = GRAPH_RESOLUTION as f64 / 2.0;
    Coordinate {
        x: rand::random_range(-upper_limit..upper_limit),
        y: 100.0,
    }
}

#[wasm_bindgen]
pub fn update_ball_coordinates() {
    let ball_coordinates = get_ball_spawn_coordinates();
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

fn main() {
    let mut rigid_body_set = RigidBodySet::new();
    let mut collider_set = ColliderSet::new();

    /* Create the ground. */
    collider_set.insert(ColliderBuilder::cuboid(100.0, 0.1).build());

    /* Create the bouncing ball. */
    let rigid_body = RigidBodyBuilder::dynamic()
        .translation(nalgebra::vector![0.0, 10.0])
        .build();
    let collider = ColliderBuilder::ball(0.5).restitution(0.7).build();
    let ball_body_handle = rigid_body_set.insert(rigid_body);
    collider_set.insert_with_parent(collider, ball_body_handle, &mut rigid_body_set);

    /* Create other structures necessary for the simulation. */
    let gravity = nalgebra::vector![0.0, -9.80665];
    let integration_parameters = IntegrationParameters::default();
    let mut physics_pipeline = PhysicsPipeline::new();
    let mut island_manager = IslandManager::new();
    let mut broad_phase = DefaultBroadPhase::new();
    let mut narrow_phase = NarrowPhase::new();
    let mut impulse_joint_set = ImpulseJointSet::new();
    let mut multibody_joint_set = MultibodyJointSet::new();
    let mut ccd_solver = CCDSolver::new();
    let mut query_pipeline = QueryPipeline::new();
    let physics_hooks = ();
    let event_handler = ();

    /* Run the game loop, stepping the simulation once per frame. */
    for _ in 0..200 {
        physics_pipeline.step(
            &gravity,
            &integration_parameters,
            &mut island_manager,
            &mut broad_phase,
            &mut narrow_phase,
            &mut rigid_body_set,
            &mut collider_set,
            &mut impulse_joint_set,
            &mut multibody_joint_set,
            &mut ccd_solver,
            Some(&mut query_pipeline),
            &physics_hooks,
            &event_handler,
        );

        let ball_body = &rigid_body_set[ball_body_handle];
        console::log_1(format!(r"Ball altitude: {}", ball_body.translation().y).into());
    }
}
