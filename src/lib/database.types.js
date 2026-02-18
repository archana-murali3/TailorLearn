/**
 * Types-only JavaScript version of your Supabase Database schema.
 *
 * This file intentionally exports **no real data** (to avoid bundling a huge object).
 * It exists so you have a `.js` file that still describes the schema via JSDoc.
 */

/**
 * @typedef {{
 *   public: {
 *     Tables: {
 *       learning_profiles: {
 *         Row: {
 *           id: string,
 *           user_id: string,
 *           learning_style: string,
 *           preferred_pace: string,
 *           goals: string,
 *           created_at: string,
 *           updated_at: string,
 *         },
 *         Insert: {
 *           id?: string,
 *           user_id: string,
 *           learning_style?: string,
 *           preferred_pace?: string,
 *           goals?: string,
 *           created_at?: string,
 *           updated_at?: string,
 *         },
 *         Update: {
 *           id?: string,
 *           user_id?: string,
 *           learning_style?: string,
 *           preferred_pace?: string,
 *           goals?: string,
 *           created_at?: string,
 *           updated_at?: string,
 *         },
 *       },
 *       courses: {
 *         Row: {
 *           id: string,
 *           title: string,
 *           description: string,
 *           difficulty_level: string,
 *           category: string,
 *           image_url: string,
 *           created_by: (string|null),
 *           created_at: string,
 *           updated_at: string,
 *         },
 *         Insert: {
 *           id?: string,
 *           title: string,
 *           description?: string,
 *           difficulty_level?: string,
 *           category?: string,
 *           image_url?: string,
 *           created_by?: (string|null),
 *           created_at?: string,
 *           updated_at?: string,
 *         },
 *         Update: {
 *           id?: string,
 *           title?: string,
 *           description?: string,
 *           difficulty_level?: string,
 *           category?: string,
 *           image_url?: string,
 *           created_by?: (string|null),
 *           created_at?: string,
 *           updated_at?: string,
 *         },
 *       },
 *       lessons: {
 *         Row: {
 *           id: string,
 *           course_id: string,
 *           title: string,
 *           content: string,
 *           lesson_order: number,
 *           duration_minutes: number,
 *           lesson_type: string,
 *           created_at: string,
 *         },
 *         Insert: {
 *           id?: string,
 *           course_id: string,
 *           title: string,
 *           content?: string,
 *           lesson_order?: number,
 *           duration_minutes?: number,
 *           lesson_type?: string,
 *           created_at?: string,
 *         },
 *         Update: {
 *           id?: string,
 *           course_id?: string,
 *           title?: string,
 *           content?: string,
 *           lesson_order?: number,
 *           duration_minutes?: number,
 *           lesson_type?: string,
 *           created_at?: string,
 *         },
 *       },
 *       user_progress: {
 *         Row: {
 *           id: string,
 *           user_id: string,
 *           lesson_id: string,
 *           course_id: string,
 *           completed: boolean,
 *           progress_percentage: number,
 *           time_spent_minutes: number,
 *           last_accessed: string,
 *           completed_at: (string|null),
 *           created_at: string,
 *         },
 *         Insert: {
 *           id?: string,
 *           user_id: string,
 *           lesson_id: string,
 *           course_id: string,
 *           completed?: boolean,
 *           progress_percentage?: number,
 *           time_spent_minutes?: number,
 *           last_accessed?: string,
 *           completed_at?: (string|null),
 *           created_at?: string,
 *         },
 *         Update: {
 *           id?: string,
 *           user_id?: string,
 *           lesson_id?: string,
 *           course_id?: string,
 *           completed?: boolean,
 *           progress_percentage?: number,
 *           time_spent_minutes?: number,
 *           last_accessed?: string,
 *           completed_at?: (string|null),
 *           created_at?: string,
 *         },
 *       },
 *       assessments: {
 *         Row: {
 *           id: string,
 *           lesson_id: string,
 *           question: string,
 *           options: unknown,
 *           correct_answer: string,
 *           created_at: string,
 *         },
 *         Insert: {
 *           id?: string,
 *           lesson_id: string,
 *           question: string,
 *           options?: unknown,
 *           correct_answer: string,
 *           created_at?: string,
 *         },
 *         Update: {
 *           id?: string,
 *           lesson_id?: string,
 *           question?: string,
 *           options?: unknown,
 *           correct_answer?: string,
 *           created_at?: string,
 *         },
 *       },
 *       user_responses: {
 *         Row: {
 *           id: string,
 *           user_id: string,
 *           assessment_id: string,
 *           response: string,
 *           is_correct: boolean,
 *           created_at: string,
 *         },
 *         Insert: {
 *           id?: string,
 *           user_id: string,
 *           assessment_id: string,
 *           response: string,
 *           is_correct?: boolean,
 *           created_at?: string,
 *         },
 *         Update: {
 *           id?: string,
 *           user_id?: string,
 *           assessment_id?: string,
 *           response?: string,
 *           is_correct?: boolean,
 *           created_at?: string,
 *         },
 *       },
 *     },
 *   },
 * }} Database
 */

/** @type {Database} */
export const Database = undefined;
